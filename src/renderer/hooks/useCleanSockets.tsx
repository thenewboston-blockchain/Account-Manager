import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import {getInactiveCleanSockets} from '@renderer/selectors/sockets';
import {
  AppDispatch,
  CleanCommand,
  CleanSocketState,
  CleanStatus,
  NodeCleanStatusWithAddress,
  SocketConnectionStatus,
} from '@renderer/types';
import {formatAddressFromNode, formatSocketAddressFromNode} from '@renderer/utils/address';
import {generateSignedMessage, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {initializeSocketForCleanStatus} from '@renderer/utils/sockets';
import handleCleanSocketEvent from '@renderer/utils/sockets/clean';
import {displayErrorToast} from '@renderer/utils/toast';
import {updateCleanProcess} from '@renderer/store/sockets';

const useCleanSockets = (): void => {
  const dispatch = useDispatch<AppDispatch>();
  const inactiveCleanSockets = useSelector(getInactiveCleanSockets);

  const fetchCleanData = useCallback(
    async (cleanSocket: CleanSocketState): Promise<void> => {
      try {
        const inCleaning = cleanSocket.clean_status === CleanStatus.cleaning;
        const cleanData = {
          clean: inCleaning ? CleanCommand.stop : CleanCommand.start,
        };

        const address = formatAddressFromNode(cleanSocket);
        const socketAddress = formatSocketAddressFromNode(cleanSocket);
        const {publicKeyHex, signingKey} = getKeyPairFromSigningKeyHex(cleanSocket.signingKey);
        const signedMessage = generateSignedMessage(cleanData, publicKeyHex, signingKey);
        const {data} = await axios.post<NodeCleanStatusWithAddress>(`${address}/clean`, signedMessage, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        dispatch(
          updateCleanProcess({
            clean_last_completed: data.clean_last_completed,
            clean_status: data.clean_status,
            id: cleanSocket.id,
          }),
        );
        if (data.clean_status === CleanStatus.cleaning || data.clean_status === CleanStatus.stopRequested) {
          const socket = initializeSocketForCleanStatus(socketAddress);
          socket.onmessage = (event) => {
            handleCleanSocketEvent(cleanSocket.id, dispatch, event);
            socket.close();
          };
        }
      } catch (error) {
        dispatch(
          updateCleanProcess({
            clean_last_completed: cleanSocket.clean_last_completed,
            clean_status: cleanSocket.clean_status || CleanStatus.notCleaning,
            connectionStatus: SocketConnectionStatus.failed,
            id: cleanSocket.id,
          }),
        );
        displayErrorToast(error);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (inactiveCleanSockets.length) {
      inactiveCleanSockets.forEach((cleanSocket) => fetchCleanData(cleanSocket));
    }
  }, [fetchCleanData, inactiveCleanSockets]);
};

export default useCleanSockets;
