import {combineReducers} from '@reduxjs/toolkit';

import crawlSockets, {startCrawlProcess, updateCrawlProcess} from './crawlSockets';

export {startCrawlProcess, updateCrawlProcess};

const socketReducers = combineReducers({
  crawl: crawlSockets.reducer,
});

export default socketReducers;
