import {useEffect, useState} from 'react';
import axios from 'axios';

import {CrawlStatus, NodeCrawlStatus} from '@renderer/types/network';
import {displayToast} from '@renderer/utils/toast';

import useAddress from './useAddress';

const useNetworkCrawlFetcher = (
  isAuthenticated: boolean,
): {crawlLastCompleted: string; crawlStatus: CrawlStatus | null; loading: boolean} => {
  const [crawlLastCompleted, setCrawlLastCompleted] = useState<string>('');
  const [crawlStatus, setCrawlStatus] = useState<CrawlStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const address = useAddress();

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

  return {
    crawlLastCompleted,
    crawlStatus,
    loading,
  };
};

export default useNetworkCrawlFetcher;
