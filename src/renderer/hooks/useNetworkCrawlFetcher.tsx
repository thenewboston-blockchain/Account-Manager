import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {useSocketAddress} from '@renderer/hooks';
import {AppDispatch, CrawlCommand, CrawlStatus, ManagedNode, NodeCrawlStatus} from '@renderer/types';
import {generateSignedMessage, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {initializeSocketForCrawlStatus, processSocketEvent} from '@renderer/utils/sockets';
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
  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

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
    if (socket) {
      socket.onmessage = (event) => {
        processSocketEvent(undefined, dispatch, event);
      };
    }
  }, [dispatch, socket]);

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
        setSocket(initializeSocketForCrawlStatus(socketAddress));
      } else {
        socket?.close();
      }
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setSubmitting(false);
    }
  }, [address, crawlStatus, managedBank?.account_signing_key, managedBank?.nid_signing_key, socket, socketAddress]);

  return {
    crawlLastCompleted,
    crawlStatus,
    handleCrawlClick: handleClick,
    loadingCrawl: loading,
    submittingCrawl: submitting,
  };
};

export default useNetworkCrawlFetcher;
