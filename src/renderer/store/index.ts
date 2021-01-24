import {configureStore} from '@reduxjs/toolkit';

import accountBalancesReducer from './accountBalances';
import appReducers from './app';
import bankReducers from './banks';
import managedAccountBalancesReducer from './managedAccountBalances';
import notificationsReducer from './notifications';
import socketReducers from './sockets';
import validatorReducers from './validators';

const store = configureStore({
  reducer: {
    accountBalances: accountBalancesReducer,
    app: appReducers,
    banks: bankReducers,
    managedAccountBalances: managedAccountBalancesReducer,
    notifications: notificationsReducer,
    sockets: socketReducers,
    validators: validatorReducers,
  },
});

export default store;
