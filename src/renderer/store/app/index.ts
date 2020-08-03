import {combineReducers} from '@reduxjs/toolkit';

import localActiveBank from './localActiveBank';

export default combineReducers({
  localActiveBank: localActiveBank.reducer,
});
