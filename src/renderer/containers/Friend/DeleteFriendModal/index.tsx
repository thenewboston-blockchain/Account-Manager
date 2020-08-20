import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {getManagedFriends} from '@renderer/selectors';
import {unsetManagedFriend} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';

import './DeleteFriendModal.scss';

interface ComponentProps {
  accountNumber: string;
  close(): void;
}

const DeleteFriendModal: FC<ComponentProps> = ({accountNumber, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const managedFriends = useSelector(getManagedFriends);

  const handleSubmit = async (): Promise<void> => {
    const friend = managedFriends[accountNumber];
    dispatch(unsetManagedFriend(friend));
    history.push(`/friend`);
    close();
  };

  return (
    <Modal
      cancelButton="Cancel"
      className="DeleteFriendModal"
      close={close}
      header={
        <>
          <h2 className="DeleteFriendModal__title">Remove Friend</h2>
        </>
      }
      onSubmit={handleSubmit}
      submitButton="Yes"
    >
      <>Are you sure you want to remove your friend?</>
    </Modal>
  );
};

export default DeleteFriendModal;
