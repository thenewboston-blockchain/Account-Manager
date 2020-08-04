import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

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

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
