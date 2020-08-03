import {configureStore} from '@reduxjs/toolkit';

import appReducers from './app';
import networkReducers from './network';
import oldReducers from './old';
import sessionReducers from './session';

const store = configureStore({
  reducer: {
    app: appReducers,
    network: networkReducers,
    old: oldReducers,
    session: sessionReducers,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
