import createCachedSelector from 're-reselect';

import {getNthArg} from '@renderer/selectors/utils';
import {parseAddressData} from '@renderer/utils/address';
import {CrawlStatusNotificationPayload, NotificationType, RootState} from '@renderer/types';
import {parseDate} from '@renderer/utils/dates';

import {getNotifications} from './state';

export const getNewCrawlNotification: (
  state: RootState,
  address: string,
  crawlLastCompletedTimestamp: string,
) => CrawlStatusNotificationPayload | null = createCachedSelector(
  [getNotifications, getNthArg(1), getNthArg(2)],
  (notifications, address: string, crawlLastCompletedTimestamp: string) => {
    if (!crawlLastCompletedTimestamp.length) return null;

    const addressData = parseAddressData(address);
    const comparisonTimestamp = parseDate(crawlLastCompletedTimestamp);

    const relevantNotification = notifications
      .filter((notification) => notification.type === NotificationType.crawlStatusNotification)
      .find(({data}: CrawlStatusNotificationPayload) => {
        const {crawl_last_completed: newTimestampString, ip_address: ipAddress, port, protocol} = data;

        const newTimestamp = parseDate(newTimestampString);

        return (
          newTimestamp > comparisonTimestamp &&
          addressData.ipAddress === ipAddress &&
          addressData.port === port &&
          addressData.protocol === protocol
        );
      }) as CrawlStatusNotificationPayload | undefined;

    if (!relevantNotification) return null;

    return relevantNotification;
  },
)((state: RootState, address, timestamp) => `${address}+${timestamp}`);
