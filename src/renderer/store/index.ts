import {configureStore} from '@reduxjs/toolkit';

import appReducers from './app';
import networkReducers from './network';
import oldReducers from './old';

const store = configureStore({
  reducer: {
    app: appReducers,
    network: networkReducers,
    old: oldReducers,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
