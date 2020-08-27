import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {unsetManagedFriend} from '@renderer/store/app';
import {AppDispatch, ManagedFriend} from '@renderer/types';

interface ComponentProps {
  close(): void;
  managedFriend: ManagedFriend;
}

const DeleteFriendModal: FC<ComponentProps> = ({close, managedFriend}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (): Promise<void> => {
    dispatch(unsetManagedFriend(managedFriend));
    close();
  };

  return (
    <Modal cancelButton="Cancel" close={close} header="Remove Friend" onSubmit={handleSubmit} submitButton="Yes">
      Are you sure you want to remove your friend?
    </Modal>
  );
};

export default DeleteFriendModal;
