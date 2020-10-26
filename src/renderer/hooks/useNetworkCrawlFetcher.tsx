import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import {getCrawlSockets} from '@renderer/selectors';
import {startCrawlProcess} from '@renderer/store/sockets';
import {AppDispatch, CrawlStatus, ManagedNode, NodeCrawlStatusWithAddress, ProtocolType} from '@renderer/types';
import {generateUuid} from '@renderer/utils/local';
import {displayToast} from '@renderer/utils/toast';

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
  const {ipAddress, port: portStr, protocol} = useParams<{ipAddress: string; port: string; protocol: ProtocolType}>();
  const port = portStr === '80' || !portStr.length ? null : parseInt(portStr, 10);
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const crawlSockets = useSelector(getCrawlSockets);
  const [crawlLastCompleted, setCrawlLastCompleted] = useState<string>('');
  const [crawlStatus, setCrawlStatus] = useState<CrawlStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [socketId, setSocketId] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const crawlSocket = socketId ? crawlSockets[socketId] : null;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const {data} = await axios.get<NodeCrawlStatusWithAddress>(`${address}/crawl`);
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
    if (!crawlSocket) return;
    if (crawlSocket.crawl_status !== crawlStatus) {
      setCrawlStatus(crawlSocket.crawl_status);
      setCrawlLastCompleted(crawlSocket.crawl_last_completed);
    }
    if (crawlSocket.crawl_status === CrawlStatus.notCrawling) {
      setSocketId('');
    }
  }, [crawlSocket, crawlSocket?.crawl_status, crawlStatus]);

  const handleClick = useCallback(async (): Promise<void> => {
    if (!managedBank?.account_signing_key) return;

    setSubmitting(true);
    if (crawlStatus === CrawlStatus.notCrawling) {
      const id = generateUuid();
      setSocketId(id);
      dispatch(startCrawlProcess({id, ip_address: ipAddress, port, protocol, signingKey: managedBank.nid_signing_key}));
    }
    setSubmitting(false);
  }, [
    crawlStatus,
    dispatch,
    ipAddress,
    managedBank?.account_signing_key,
    managedBank?.nid_signing_key,
    port,
    protocol,
  ]);

  return {
    crawlLastCompleted,
    crawlStatus,
    handleCrawlClick: handleClick,
    loadingCrawl: loading,
    submittingCrawl: submitting,
  };
};

export default useNetworkCrawlFetcher;
