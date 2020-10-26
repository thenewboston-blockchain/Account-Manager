import {setCrawlStatusNotification} from '@renderer/store/notifications';
import {AppDispatch, NodeCrawlStatusWithAddress, NotificationType} from '@renderer/types';
import {generateUuid} from '@renderer/utils/local';
import {displayToast} from '@renderer/utils/toast';
import {updateCrawlProcess} from '@renderer/store/sockets';

const handleCrawlSocketEvent = async (crawlSocketId: string, dispatch: AppDispatch, event: any): Promise<void> => {
  try {
    const {notification_type: notificationType, payload} = JSON.parse(event.data) as {
      payload: NodeCrawlStatusWithAddress;
      notification_type: NotificationType.crawlStatusNotification;
    };
    dispatch(
      updateCrawlProcess({
        crawl_last_completed: payload.crawl_last_completed,
        crawl_status: payload.crawl_status,
        id: crawlSocketId,
      }),
    );
    dispatch(
      setCrawlStatusNotification({
        data: payload,
        id: generateUuid(),
        timestamp: new Date().getTime(),
        type: notificationType,
      }),
    );
  } catch (err) {
    displayToast('An error occurred');
  }
};

export default handleCrawlSocketEvent;
