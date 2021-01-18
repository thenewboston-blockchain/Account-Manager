import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {getActiveBank, getManagedAccounts} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';
import {formatSocketAddressFromNode} from '@renderer/utils/address';
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
  const bankSocketAddress = activeBank ? formatSocketAddressFromNode(activeBank) : '';

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
};

export default useWebSockets;
