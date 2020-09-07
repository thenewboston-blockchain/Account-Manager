import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NOTIFICATIONS} from '@renderer/constants';
import {Notification, NotificationDict, NotificationType} from '@renderer/types';

const notifications = createSlice({
  initialState: {} as NotificationDict,
  name: NOTIFICATIONS,
  reducers: {
    setConfirmationBlockNotification: (state, {payload}: PayloadAction<Notification>) => {
      const blockIdentifiers = Object.values(state)
        .filter(({notificationType}) => notificationType === NotificationType.confirmationBlockNotification)
        .map((notification) => notification.payload.message.block_identifier);

      if (blockIdentifiers.includes(payload.payload.message.block_identifier)) return;

      const {notificationTime} = payload;
      state[notificationTime] = payload;
    },
  },
});

export const {setConfirmationBlockNotification} = notifications.actions;

export default notifications;
