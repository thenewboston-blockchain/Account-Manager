import React, {FC} from 'react';
import {useDispatch} from 'react-redux';

import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {unsetManagedAccount} from '@renderer/store/app';
import {AppDispatch, ManagedAccount} from '@renderer/types';

import './DeleteAccountModal.scss';

interface ComponentProps {
  close(): void;
  managedAccount: ManagedAccount;
}

const DeleteAccountModal: FC<ComponentProps> = ({close, managedAccount}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (): Promise<void> => {
    dispatch(unsetManagedAccount(managedAccount));
    close();
  };

  return (
    <Modal
      cancelButton="Cancel"
      className="DeleteAccountModal"
      close={close}
      header={
        <>
          <Icon className="DeleteAccountModal__icon" icon={IconType.alert} />
          <h2 className="DeleteAccountModal__title">Delete Account</h2>
        </>
      }
      onSubmit={handleSubmit}
      submitButton="Yes"
    >
      <>
        <span className="DeleteAccountModal__warning-span">Warning: </span> If you delete your account, you will lose
        all the coins in your account as well as your signing key. Are you sure you want to delete your account?
      </>
    </Modal>
  );
};

export default DeleteAccountModal;
