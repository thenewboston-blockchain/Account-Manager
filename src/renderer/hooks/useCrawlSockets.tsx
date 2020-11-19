import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import {getInactiveCrawlSockets} from '@renderer/selectors/sockets';
import {
  AppDispatch,
  CrawlCommand,
  CrawlSocketState,
  CrawlStatus,
  NodeCrawlStatusWithAddress,
  SocketConnectionStatus,
} from '@renderer/types';
import {formatAddressFromNode, formatSocketAddressFromNode} from '@renderer/utils/address';
import {generateSignedMessage, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {initializeSocketForCrawlStatus} from '@renderer/utils/sockets';
import handleCrawlSocketEvent from '@renderer/utils/sockets/crawl';
import {displayErrorToast} from '@renderer/utils/toast';
import {updateCrawlProcess} from '@renderer/store/sockets';

const useCrawlSockets = (): void => {
  const dispatch = useDispatch<AppDispatch>();
  const inactiveCrawlSockets = useSelector(getInactiveCrawlSockets);

  const fetchCrawlData = useCallback(
    async (crawlSocket: CrawlSocketState): Promise<void> => {
      try {
        const inCrawling = crawlSocket.crawl_status === CrawlStatus.crawling;
        const crawlData = {
          crawl: inCrawling ? CrawlCommand.stop : CrawlCommand.start,
        };

        const address = formatAddressFromNode(crawlSocket);
        const socketAddress = formatSocketAddressFromNode(crawlSocket);
        const {publicKeyHex, signingKey} = getKeyPairFromSigningKeyHex(crawlSocket.signingKey);
        const signedMessage = generateSignedMessage(crawlData, publicKeyHex, signingKey);
        const {data} = await axios.post<NodeCrawlStatusWithAddress>(`${address}/crawl`, signedMessage, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        dispatch(
          updateCrawlProcess({
            crawl_last_completed: data.crawl_last_completed,
            crawl_status: data.crawl_status,
            id: crawlSocket.id,
          }),
        );
        if (data.crawl_status === CrawlStatus.crawling || data.crawl_status === CrawlStatus.stopRequested) {
          const socket = initializeSocketForCrawlStatus(socketAddress);
          socket.onmessage = (event) => {
            handleCrawlSocketEvent(crawlSocket.id, dispatch, event);
            socket.close();
          };
        }
      } catch (error) {
        dispatch(
          updateCrawlProcess({
            connectionStatus: SocketConnectionStatus.failed,
            crawl_last_completed: crawlSocket.crawl_last_completed,
            crawl_status: crawlSocket.crawl_status || CrawlStatus.notCrawling,
            id: crawlSocket.id,
          }),
        );
        displayErrorToast(error);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (inactiveCrawlSockets.length) {
      inactiveCrawlSockets.forEach((crawlSocket) => fetchCrawlData(crawlSocket));
    }
  }, [fetchCrawlData, inactiveCrawlSockets]);
};

export default useCrawlSockets;
