import {configureStore} from '@reduxjs/toolkit';

import appReducers from './app';
import configsReducers from './configs';
import networkReducers from './network';
import oldReducers from './old';

const store = configureStore({
  reducer: {
    app: appReducers,
    configs: configsReducers,
    network: networkReducers,
    old: oldReducers,
  },
});

export default store;
