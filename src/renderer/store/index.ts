import {configureStore} from '@reduxjs/toolkit';

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {},
});
