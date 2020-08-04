import {combineReducers} from '@reduxjs/toolkit';

import bankConfigs from './bankConfigs';
import validatorConfigs from './validatorConfigs';

export default combineReducers({
  bankConfigs: bankConfigs.reducer,
  validatorConfigs: validatorConfigs.reducer,
});
