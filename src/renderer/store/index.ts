import {configureStore} from '@reduxjs/toolkit';

import appReducers from './app';
import networkReducers from './network';
import oldReducers from './old';

export default configureStore({
  reducer: {
    app: appReducers,
    network: networkReducers,
    old: oldReducers,
  },
});
