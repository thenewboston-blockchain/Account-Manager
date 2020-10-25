import {configureStore} from '@reduxjs/toolkit';

import appReducers from './app';
import bankReducers from './banks';
import notifications from './notifications';
import sockets from './sockets';
import validatorReducers from './validators';

const store = configureStore({
  reducer: {
    app: appReducers,
    banks: bankReducers,
    notifications: notifications.reducer,
    sockets: sockets.reducer,
    validators: validatorReducers,
  },
});

export default store;
