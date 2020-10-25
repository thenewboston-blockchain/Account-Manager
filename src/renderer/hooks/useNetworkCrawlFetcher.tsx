import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import {useSocketAddress} from '@renderer/hooks';
import {getNewCrawlNotification} from '@renderer/selectors';
import {subscribeToSocket, unsubscribeFromSocket} from '@renderer/store/sockets';
import {AppDispatch, CrawlCommand, CrawlStatus, ManagedNode, NodeCrawlStatus, RootState} from '@renderer/types';
import {generateSignedMessage, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {initializeSocketForCrawlStatus} from '@renderer/utils/sockets';
import handleCrawlStatusNotifications from '@renderer/utils/sockets/crawl-status-notifications';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';

import useAddress from './useAddress';

const useNetworkCrawlFetcher = (
  managedBank: ManagedNode | undefined,
  isAuthenticated: boolean,
): {
  crawlLastCompleted: string;
  crawlStatus: CrawlStatus | null;
  handleCrawlClick: () => Promise<void>;
  loadingCrawl: boolean;
  submittingCrawl: boolean;
} => {
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const socketAddress = useSocketAddress();
  const [crawlLastCompleted, setCrawlLastCompleted] = useState<string>('');
  const [crawlStatus, setCrawlStatus] = useState<CrawlStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const relevantNotification = useSelector((state: RootState) =>
    getNewCrawlNotification(state, address, crawlLastCompleted),
  );

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const {data} = await axios.get<NodeCrawlStatus>(`${address}/crawl`);
        setCrawlStatus(data.crawl_status);
        setCrawlLastCompleted(data.crawl_last_completed);
      } catch (error) {
        displayToast('An error occurred when getting crawl status');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [address, isAuthenticated]);

  useEffect(() => {
    if (relevantNotification) {
      const {data} = relevantNotification;
      setCrawlStatus(data.crawl_status);
      setCrawlLastCompleted(data.crawl_last_completed);
    }
  }, [relevantNotification]);

  const handleClick = useCallback(async (): Promise<void> => {
    if (!managedBank?.account_signing_key) return;

    setSubmitting(true);
    try {
      const crawlData = {
        crawl: crawlStatus === CrawlStatus.notCrawling ? CrawlCommand.start : CrawlCommand.stop,
      };

      const {publicKeyHex, signingKey} = getKeyPairFromSigningKeyHex(managedBank.nid_signing_key);
      const signedMessage = generateSignedMessage(crawlData, publicKeyHex, signingKey);
      const {data} = await axios.post<NodeCrawlStatus>(`${address}/crawl`, signedMessage, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setCrawlLastCompleted(data.crawl_last_completed);
      setCrawlStatus(data.crawl_status);

      if (data.crawl_status === CrawlStatus.crawling) {
        const socket = initializeSocketForCrawlStatus(socketAddress);
        socket.onmessage = (event) => {
          handleCrawlStatusNotifications(undefined, dispatch, event);
        };
        dispatch(subscribeToSocket({address: socketAddress, socket}));
      } else {
        dispatch(unsubscribeFromSocket({address: socketAddress}));
      }
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setSubmitting(false);
    }
  }, [address, crawlStatus, dispatch, managedBank?.account_signing_key, managedBank?.nid_signing_key, socketAddress]);

  return {
    crawlLastCompleted,
    crawlStatus,
    handleCrawlClick: handleClick,
    loadingCrawl: loading,
    submittingCrawl: submitting,
  };
};

export default useNetworkCrawlFetcher;
