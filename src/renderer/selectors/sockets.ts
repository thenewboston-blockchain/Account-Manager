import {createSelector} from '@reduxjs/toolkit';
import {SocketConnectionStatus} from '@renderer/types';
import {getCrawlSockets} from './state';

export const getInactiveCrawlSockets = createSelector([getCrawlSockets], (crawlSockets) => {
  return Object.values(crawlSockets).filter(
    (crawlSocket) => crawlSocket.connectionStatus === SocketConnectionStatus.inactive,
  );
});
