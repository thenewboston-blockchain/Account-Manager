import {combineReducers} from '@reduxjs/toolkit';

import banks from './banks';
import validators from './validators';

export default combineReducers({
  banks: banks.reducer,
  validators: validators.reducer,
});
