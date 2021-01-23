import {combineReducers} from '@reduxjs/toolkit';

import crawlSocketsReducer, {toggleCrawlProcess, updateCrawlProcess} from './crawlSockets';
import cleanSocketsReducer, {toggleCleanProcess, updateCleanProcess} from './cleanSockets';

export {toggleCrawlProcess, updateCrawlProcess, toggleCleanProcess, updateCleanProcess};

const socketReducers = combineReducers({
  clean: cleanSocketsReducer,
  crawl: crawlSocketsReducer,
});

export default socketReducers;
