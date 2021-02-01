import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CLEAN_SOCKETS} from '@renderer/constants/actions';
import {
  AddressData,
  CleanSocketState,
  CleanStatus,
  Dict,
  Id,
  NodeCleanStatus,
  SocketConnectionStatus,
} from '@renderer/types';

interface ToggleCleanProcessPayload extends AddressData, Id {
  signingKey: string;
  cleanStatus: CleanStatus;
}

interface UpdateCleanProcessPayload extends NodeCleanStatus, Id {
  connectionStatus?: SocketConnectionStatus;
}

const cleanSockets = createSlice({
  initialState: {} as Dict<CleanSocketState>,
  name: CLEAN_SOCKETS,
  reducers: {
    toggleCleanProcess: (state, {payload}: PayloadAction<ToggleCleanProcessPayload>) => {
      const {id, cleanStatus, ip_address: ipAddress, port, protocol, signingKey} = payload;
      state[id] = {
        clean_last_completed: '',
        clean_status: cleanStatus,
        connectionStatus: SocketConnectionStatus.inactive,
        id,
        ip_address: ipAddress,
        port,
        protocol,
        signingKey,
      };
    },
    updateCleanProcess: (state, {payload}: PayloadAction<UpdateCleanProcessPayload>) => {
      const {connectionStatus, clean_last_completed: cleanLastCompleted, clean_status: cleanStatus, id} = payload;
      if (!state[id]) {
        throw new Error('Could not update clean process. Id does not exist');
      }

      state[id].clean_last_completed = cleanLastCompleted;
      state[id].clean_status = cleanStatus;
      if (connectionStatus) {
        state[id].connectionStatus = connectionStatus;
      } else if (cleanStatus === CleanStatus.notCleaning) {
        state[id].connectionStatus = SocketConnectionStatus.completed;
      } else {
        state[id].connectionStatus = SocketConnectionStatus.active;
      }
    },
  },
});

export const {toggleCleanProcess, updateCleanProcess} = cleanSockets.actions;

export default cleanSockets.reducer;
