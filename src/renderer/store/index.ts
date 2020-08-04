import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

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

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
