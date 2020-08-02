import {configureStore} from '@reduxjs/toolkit';

import oldReducers, {oldPreloadedState} from '@renderer/store/old';

const preloadedState = {
  old: oldPreloadedState,
};

export default configureStore({
  preloadedState,
  reducer: {
    old: oldReducers,
  },
});
