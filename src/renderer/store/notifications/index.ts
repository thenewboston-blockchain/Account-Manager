import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NOTIFICATIONS} from '@renderer/constants/actions';
import {
  ConfirmationBlockNotificationPayload,
  CrawlStatusNotificationPayload,
  CleanStatusNotificationPayload,
  NotificationPayload,
  NotificationType,
  PrimaryValidatorUpdatedNotificationPayload,
  ValidatorConfirmationServiceNotificationPayload,
} from '@renderer/types';

const notifications = createSlice({
  initialState: [] as NotificationPayload[],
  name: NOTIFICATIONS,
  reducers: {
    setCleanStatusNotification: (state, {payload}: PayloadAction<CleanStatusNotificationPayload>) => {
      state.push(payload);
    },
    setConfirmationBlockNotification: (state, {payload}: PayloadAction<ConfirmationBlockNotificationPayload>) => {
      const blockIdentifiers = Object.values(state)
        .filter(({type}) => type === NotificationType.confirmationBlockNotification)
        .map((notification) => notification.data.message.block_identifier);

      if (blockIdentifiers.includes(payload.data.message.block_identifier)) return;

      state.push(payload);
    },
    setCrawlStatusNotification: (state, {payload}: PayloadAction<CrawlStatusNotificationPayload>) => {
      state.push(payload);
    },
    setPrimaryValidatorUpdatedNotification: (
      state,
      {payload}: PayloadAction<PrimaryValidatorUpdatedNotificationPayload>,
    ) => {
      state.push(payload);
    },
    setValidatorConfirmationServiceNotification: (
      state,
      {payload}: PayloadAction<ValidatorConfirmationServiceNotificationPayload>,
    ) => {
      state.push(payload);
    },
  },
});

export const {
  setConfirmationBlockNotification,
  setCrawlStatusNotification,
  setCleanStatusNotification,
  setPrimaryValidatorUpdatedNotification,
  setValidatorConfirmationServiceNotification,
} = notifications.actions;

export default notifications.reducer;
