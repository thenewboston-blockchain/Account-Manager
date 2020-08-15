import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {getManagedAccounts} from '@renderer/selectors';
import {unsetManagedAccount} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';

import './DeleteAccountModal.scss';

interface ComponentProps {
  accountNumber: string;
  toggleDeleteModal(): void;
}

const DeleteAccountModal: FC<ComponentProps> = ({accountNumber, toggleDeleteModal}) => {
  const dispatch = useDispatch<AppDispatch>();
  const managedAccounts = useSelector(getManagedAccounts);

  const handleSubmit = async (): Promise<void> => {
    const account = managedAccounts[accountNumber];
    dispatch(unsetManagedAccount(account));
  };

  return (
    <Modal
      cancelButton="Cancel"
      className="DeleteAccountModal"
      close={toggleDeleteModal}
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
        all the points in your account as well as your signing key. Are you sure you want to delete your account?
      </>
    </Modal>
  );
};

export default DeleteAccountModal;
