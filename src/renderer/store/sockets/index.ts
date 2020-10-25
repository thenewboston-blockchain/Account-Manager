import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {SOCKETS} from '@renderer/constants';
import {Dict} from '@renderer/types';

const sockets = createSlice({
  initialState: {} as Dict<ReconnectingWebSocket>,
  name: SOCKETS,
  reducers: {
    subscribeToSocket: (state, {payload}: PayloadAction<{address: string; socket: ReconnectingWebSocket}>) => {
      const {address, socket} = payload;
      if (state[address]) {
        state[address].close();
      }

      state[address] = socket;
    },
    unsubscribeFromSocket: (state, {payload}: PayloadAction<{address: string}>) => {
      const {address} = payload;
      if (state[address]) {
        state[address].close();
      }
      delete state[address];
    },
  },
});

export const {subscribeToSocket, unsubscribeFromSocket} = sockets.actions;

export default sockets;
