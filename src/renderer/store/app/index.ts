import {combineReducers} from '@reduxjs/toolkit';

import activeBank, {setActiveBank, unsetActiveBank} from './activeBank';
import activePrimaryValidator, {setActivePrimaryValidator, unsetActivePrimaryValidator} from './activePrimaryValidator';

export {setActiveBank, setActivePrimaryValidator, unsetActiveBank, unsetActivePrimaryValidator};

const appReducers = combineReducers({
  activeBank: activeBank.reducer,
  activePrimaryValidator: activePrimaryValidator.reducer,
});

export default appReducers;
