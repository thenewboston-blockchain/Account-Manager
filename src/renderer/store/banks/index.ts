import {combineReducers} from '@reduxjs/toolkit';

import {CONFIGS} from '@renderer/constants/store';
import bankConfigs, {setBankConfig, setBankConfigError} from './bankConfigs';

export {setBankConfig, setBankConfigError};

const bankReducers = combineReducers({
  [CONFIGS]: bankConfigs.reducer,
});

export default bankReducers;
