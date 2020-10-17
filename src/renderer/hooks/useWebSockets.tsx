import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {getActiveBank, getManagedAccounts} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';
import {formatSocketAddress} from '@renderer/utils/address';
import {
  initializeSocketForPrimaryValidatorUpdated,
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
    const socket = initializeSocketForPrimaryValidatorUpdated(bankSocketAddress);

    socket.onmessage = (event) => {
      processSocketEvent(bankSocketAddress, dispatch, event);
    };

    return () => {
      socket.close();
    };
  }, [bankSocketAddress, dispatch]);
};

export default useWebSockets;
