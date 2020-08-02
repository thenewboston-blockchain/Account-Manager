import {combineReducers} from '@reduxjs/toolkit';

import activeBank from './activeBank';
import activePrimaryValidator from './activePrimaryValidator';

export default combineReducers({
  activeBank: activeBank.reducer,
  activePrimaryValidator: activePrimaryValidator.reducer,
});
