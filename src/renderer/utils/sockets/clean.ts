import {setCleanStatusNotification} from '@renderer/store/notifications';
import {AppDispatch, NodeCleanStatusWithAddress, NotificationType} from '@renderer/types';
import {generateUuid} from '@renderer/utils/local';
import {displayToast} from '@renderer/utils/toast';
import {updateCleanProcess} from '@renderer/store/sockets';

const handleCleanSocketEvent = async (cleanSocketId: string, dispatch: AppDispatch, event: any): Promise<void> => {
  try {
    const {notification_type: notificationType, payload} = JSON.parse(event.data) as {
      payload: NodeCleanStatusWithAddress;
      notification_type: NotificationType.cleanStatusNotification;
    };
    dispatch(
      updateCleanProcess({
        clean_last_completed: payload.clean_last_completed,
        clean_status: payload.clean_status,
        id: cleanSocketId,
      }),
    );
    dispatch(
      setCleanStatusNotification({
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

export default handleCleanSocketEvent;
