import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CRAWL_SOCKETS} from '@renderer/constants';
import {
  AddressData,
  CrawlSocketState,
  CrawlStatus,
  Dict,
  Id,
  NodeCrawlStatus,
  SocketConnectionStatus,
} from '@renderer/types';

interface StartCrawlProcessPayload extends AddressData, Id {
  signingKey: string;
}

type UpdateCrawlProcessPayload = NodeCrawlStatus & Id;

const crawlSockets = createSlice({
  initialState: {} as Dict<CrawlSocketState>,
  name: CRAWL_SOCKETS,
  reducers: {
    startCrawlProcess: (state, {payload}: PayloadAction<StartCrawlProcessPayload>) => {
      const {id, ip_address: ipAddress, port, protocol, signingKey} = payload;
      if (id in state) {
        throw new Error('Crawl ID already exists');
      }
      state[id] = {
        connectionStatus: SocketConnectionStatus.inactive,
        crawl_last_completed: '',
        crawl_status: null,
        id,
        ip_address: ipAddress,
        port,
        protocol,
        signingKey,
      };
    },
    updateCrawlProcess: (state, {payload}: PayloadAction<UpdateCrawlProcessPayload>) => {
      const {crawl_last_completed: crawlLastCompleted, crawl_status: crawlStatus, id} = payload;

      if (!state[id]) {
        throw new Error('Could not update crawl process. Id does not exist');
      }

      state[id].crawl_last_completed = crawlLastCompleted;
      state[id].crawl_status = crawlStatus;

      if (crawlStatus === CrawlStatus.notCrawling) {
        state[id].connectionStatus = SocketConnectionStatus.completed;
      } else {
        state[id].connectionStatus = SocketConnectionStatus.active;
      }
    },
  },
});

export const {startCrawlProcess, updateCrawlProcess} = crawlSockets.actions;

export default crawlSockets;
