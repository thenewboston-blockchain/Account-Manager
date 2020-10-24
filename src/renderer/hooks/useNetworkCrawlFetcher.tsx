import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

import {CrawlCommand, CrawlStatus, ManagedNode, NodeCrawlStatus} from '@renderer/types';
import {generateSignedMessage, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
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
  const [crawlLastCompleted, setCrawlLastCompleted] = useState<string>('');
  const [crawlStatus, setCrawlStatus] = useState<CrawlStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setSubmitting(false);
    }
  }, [address, crawlStatus, managedBank?.account_signing_key, managedBank?.nid_signing_key]);

  return {
    crawlLastCompleted,
    crawlStatus,
    handleCrawlClick: handleClick,
    loadingCrawl: loading,
    submittingCrawl: submitting,
  };
};

export default useNetworkCrawlFetcher;
