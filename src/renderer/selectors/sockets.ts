import {createSelector} from '@reduxjs/toolkit';
import {SocketConnectionStatus} from '@renderer/types';
import {getCrawlSockets, getCleanSockets} from './state';

export const getInactiveCrawlSockets = createSelector([getCrawlSockets], (crawlSockets) => {
  return Object.values(crawlSockets).filter(
    (crawlSocket) => crawlSocket.connectionStatus === SocketConnectionStatus.inactive,
  );
});

export const getInactiveCleanSockets = createSelector([getCleanSockets], (cleanSockets) => {
  return Object.values(cleanSockets).filter(
    (cleanSocket) => cleanSocket.connectionStatus === SocketConnectionStatus.inactive,
  );
});
