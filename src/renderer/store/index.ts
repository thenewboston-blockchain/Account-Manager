import {configureStore} from '@reduxjs/toolkit';

import appReducers from './app';
import bankReducers from './banks';
import validatorReducers from './validators';

const store = configureStore({
  reducer: {
    app: appReducers,
    banks: bankReducers,
    validators: validatorReducers,
  },
});

export default store;
