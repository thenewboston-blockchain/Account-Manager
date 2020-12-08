import {combineReducers} from '@reduxjs/toolkit';

import crawlSockets, {toggleCrawlProcess, updateCrawlProcess} from './crawlSockets';
import cleanSockets, {toggleCleanProcess, updateCleanProcess} from './cleanSockets';

export {toggleCrawlProcess, updateCrawlProcess, toggleCleanProcess, updateCleanProcess};

const socketReducers = combineReducers({
  clean: cleanSockets.reducer,
  crawl: crawlSockets.reducer,
});

export default socketReducers;
