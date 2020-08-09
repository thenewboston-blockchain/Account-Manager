import {configureStore} from '@reduxjs/toolkit';

import appReducers from './app';
import bankReducers from './banks';
import oldReducers from './old';
import validatorReducers from './validators';

const store = configureStore({
  reducer: {
    app: appReducers,
    banks: bankReducers,
    old: oldReducers,
    validators: validatorReducers,
  },
});

export default store;
