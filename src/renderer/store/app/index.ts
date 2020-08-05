import {combineReducers} from '@reduxjs/toolkit';

import activeBank, {setActiveBankState, unsetActiveBankState} from './activeBank';
import activePrimaryValidator, {
  setActivePrimaryValidatorState,
  unsetActivePrimaryValidatorState,
} from './activePrimaryValidator';

export {setActiveBankState, setActivePrimaryValidatorState, unsetActiveBankState, unsetActivePrimaryValidatorState};

export default combineReducers({
  activeBank: activeBank.reducer,
  activePrimaryValidator: activePrimaryValidator.reducer,
});
