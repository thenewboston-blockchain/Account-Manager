import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';

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
  const managedFriends = useSelector(getManagedFriends);

  const handleSubmit = async (): Promise<void> => {
    const friend = managedFriends[accountNumber];
    dispatch(unsetManagedFriend(friend));
    close();
  };

  return (
    <Modal
      cancelButton="Cancel"
      className="DeleteFriendModal"
      close={close}
      header={
        <>
          <Icon className="DeleteFriendModal__icon" icon={IconType.alert} />
          <h2 className="DeleteFriendModal__title">Delete Friend Account</h2>
        </>
      }
      onSubmit={handleSubmit}
      submitButton="Yes"
    >
      <>
        <span className="DeleteFriendModal__warning-span">Warning: </span> If you delete your friend account, you will
        lose all the points in your friend as well as your signing key. Are you sure you want to delete your friend?
      </>
    </Modal>
  );
};

export default DeleteFriendModal;
