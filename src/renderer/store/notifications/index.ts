import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NOTIFICATIONS} from '@renderer/constants';
import {Notification, NotificationType} from '@renderer/types';

const notifications = createSlice({
  initialState: [] as Notification[],
  name: NOTIFICATIONS,
  reducers: {
    setConfirmationBlockNotification: (state, {payload}: PayloadAction<Notification>) => {
      const blockIdentifiers = Object.values(state)
        .filter(({notificationType}) => notificationType === NotificationType.confirmationBlockNotification)
        .map((notification) => notification.payload.message.block_identifier);

      if (blockIdentifiers.includes(payload.payload.message.block_identifier)) return;

      state.push(payload);
    },
  },
});

export const {setConfirmationBlockNotification} = notifications.actions;

export default notifications;
