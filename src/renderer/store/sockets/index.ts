import {combineReducers} from '@reduxjs/toolkit';

import crawlSockets, {toggleCrawlProcess, updateCrawlProcess} from './crawlSockets';

export {toggleCrawlProcess, updateCrawlProcess};

const socketReducers = combineReducers({
  crawl: crawlSockets.reducer,
});

export default socketReducers;
