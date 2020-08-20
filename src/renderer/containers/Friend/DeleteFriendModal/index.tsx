import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {getManagedFriends} from '@renderer/selectors';
import {unsetManagedFriend} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';

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
    <Modal cancelButton="Cancel" close={close} header="Remove Friend" onSubmit={handleSubmit} submitButton="Yes">
      Are you sure you want to remove your friend?
    </Modal>
  );
};

export default DeleteFriendModal;
