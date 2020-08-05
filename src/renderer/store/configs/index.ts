import {combineReducers} from '@reduxjs/toolkit';

import bankConfigs, {setBankConfig} from './bankConfigs';
import validatorConfigs, {setValidatorConfig} from './validatorConfigs';

export {setBankConfig, setValidatorConfig};

export default combineReducers({
  bankConfigs: bankConfigs.reducer,
  validatorConfigs: validatorConfigs.reducer,
});
