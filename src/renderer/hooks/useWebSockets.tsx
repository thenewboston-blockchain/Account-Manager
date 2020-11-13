import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {getActiveBank, getManagedAccounts} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';
import {formatSocketAddress} from '@renderer/utils/address';
import {
  initializeSocketForPrimaryValidatorUpdated,
  initializeSocketForValidatorConfirmationService,
  initializeSocketsForConfirmationBlocks,
  processSocketEvent,
} from '@renderer/utils/sockets';

const useWebSockets = (): void => {
  const dispatch = useDispatch<AppDispatch>();
  const activeBank = useSelector(getActiveBank);
  const managedAccounts = useSelector(getManagedAccounts);
  const bankSocketAddress = activeBank ? formatSocketAddress(activeBank) : '';

  const managedAccountNumbersString = useMemo(
    () =>
      Object.values(managedAccounts)
        .map(({account_number}) => account_number)
        .sort()
        .join('-'),
    [managedAccounts],
  );
  const managedAccountNumbers = useMemo(() => managedAccountNumbersString.split('-'), [managedAccountNumbersString]);

  useEffect(() => {
    if (!bankSocketAddress) return;
    const sockets = initializeSocketsForConfirmationBlocks(managedAccountNumbers, bankSocketAddress);

    sockets.forEach((socket: ReconnectingWebSocket) => {
      socket.onmessage = (event) => {
        processSocketEvent(managedAccountNumbers, dispatch, event);
      };
    });

    return () => {
      sockets.forEach((socket: ReconnectingWebSocket) => socket.close());
    };
  }, [bankSocketAddress, dispatch, managedAccountNumbers]);

  useEffect(() => {
    if (!bankSocketAddress) return;
    const socketPrimaryValidatorUpdated = initializeSocketForPrimaryValidatorUpdated(bankSocketAddress);
    const socketValidatorConfirmedService = initializeSocketForValidatorConfirmationService(bankSocketAddress);

    socketPrimaryValidatorUpdated.onmessage = (event) => {
      processSocketEvent(bankSocketAddress, dispatch, event);
    };

    socketValidatorConfirmedService.onmessage = (event) => {
      processSocketEvent(bankSocketAddress, dispatch, event);
    };

    return () => {
      socketPrimaryValidatorUpdated.close();
      socketValidatorConfirmedService.close();
    };
  }, [bankSocketAddress, dispatch]);

  useEffect(() => {
    processSocketEvent('143.110.137.54', dispatch, {
      data: `{"notification_type":"VALIDATOR_CONFIRMATION_SERVICE_NOTIFICATION","payload":{"bank_node_identifier":"b1b232503b3db3975524faf98674f22c83f4357c3d946431b8a8568715d7e1d9","validator_confirmation_service":{"created_date":"2020-10-01T03:39:36.675680Z","end":"2021-06-03T22:15:09.343282Z","id":"6c5d1336-4454-454d-96f9-124a9a659cc9","modified_date":"2020-10-01T03:39:36.675734Z","start":"2021-06-01T22:15:09.343282Z","validator":"e2a138b0-ebe9-47d2-a146-fb4d9d9ca378"}}}`,
    } as MessageEvent);
  }, [dispatch]);
};

export default useWebSockets;
