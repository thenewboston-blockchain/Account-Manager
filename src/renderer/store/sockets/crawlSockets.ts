import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CRAWL_SOCKETS} from '@renderer/constants/actions';
import {
  AddressData,
  CrawlSocketState,
  CrawlStatus,
  Dict,
  Id,
  NodeCrawlStatus,
  SocketConnectionStatus,
} from '@renderer/types';

interface ToggleCrawlProcessPayload extends AddressData, Id {
  signingKey: string;
  crawlStatus: CrawlStatus;
}

interface UpdateCrawlProcessPayload extends NodeCrawlStatus, Id {
  connectionStatus?: SocketConnectionStatus;
}

const crawlSockets = createSlice({
  initialState: {} as Dict<CrawlSocketState>,
  name: CRAWL_SOCKETS,
  reducers: {
    toggleCrawlProcess: (state, {payload}: PayloadAction<ToggleCrawlProcessPayload>) => {
      const {id, crawlStatus, ip_address: ipAddress, port, protocol, signingKey} = payload;

      state[id] = {
        connectionStatus: SocketConnectionStatus.inactive,
        crawl_last_completed: '',
        crawl_status: crawlStatus,
        id,
        ip_address: ipAddress,
        port,
        protocol,
        signingKey,
      };
    },
    updateCrawlProcess: (state, {payload}: PayloadAction<UpdateCrawlProcessPayload>) => {
      const {connectionStatus, crawl_last_completed: crawlLastCompleted, crawl_status: crawlStatus, id} = payload;
      if (!state[id]) {
        throw new Error('Could not update crawl process. Id does not exist');
      }

      state[id].crawl_last_completed = crawlLastCompleted;
      state[id].crawl_status = crawlStatus;
      if (connectionStatus) {
        state[id].connectionStatus = connectionStatus;
      } else if (crawlStatus === CrawlStatus.notCrawling) {
        state[id].connectionStatus = SocketConnectionStatus.completed;
      } else {
        state[id].connectionStatus = SocketConnectionStatus.active;
      }
    },
  },
});

export const {toggleCrawlProcess, updateCrawlProcess} = crawlSockets.actions;

export default crawlSockets.reducer;
