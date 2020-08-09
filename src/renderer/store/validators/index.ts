import {combineReducers} from '@reduxjs/toolkit';

import {CONFIGS} from '@renderer/constants/store';
import validatorConfigs, {setValidatorConfig, setValidatorConfigError} from './validatorConfigs';

export {setValidatorConfig, setValidatorConfigError};

const validatorReducers = combineReducers({
  [CONFIGS]: validatorConfigs.reducer,
});

export default validatorReducers;
