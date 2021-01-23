import {configureStore} from '@reduxjs/toolkit';

import appReducers from './app';
import bankReducers from './banks';
import managedAccountBalances from './managedAccountBalances';
import notifications from './notifications';
import socketReducers from './sockets';
import validatorReducers from './validators';

const store = configureStore({
  reducer: {
    app: appReducers,
    banks: bankReducers,
    managedAccountBalances: managedAccountBalances.reducer,
    notifications: notifications.reducer,
    sockets: socketReducers,
    validators: validatorReducers,
  },
});

export default store;
