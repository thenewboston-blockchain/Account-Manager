import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NOTIFICATIONS} from '@renderer/constants';
import {
  ConfirmationBlockNotificationPayload,
  NotificationPayload,
  NotificationType,
  PrimaryValidatorUpdatedNotificationPayload,
} from '@renderer/types';

const notifications = createSlice({
  initialState: [] as NotificationPayload[],
  name: NOTIFICATIONS,
  reducers: {
    setConfirmationBlockNotification: (state, {payload}: PayloadAction<ConfirmationBlockNotificationPayload>) => {
      const blockIdentifiers = Object.values(state)
        .filter(({type}) => type === NotificationType.confirmationBlockNotification)
        .map((notification) => notification.data.message.block_identifier);

      if (blockIdentifiers.includes(payload.data.message.block_identifier)) return;

      state.push(payload);
    },
    setPrimaryValidatorUpdatedNotification: (
      state,
      {payload}: PayloadAction<PrimaryValidatorUpdatedNotificationPayload>,
    ) => {
      state.push(payload);
    },
  },
});

export const {setConfirmationBlockNotification, setPrimaryValidatorUpdatedNotification} = notifications.actions;

export default notifications;
