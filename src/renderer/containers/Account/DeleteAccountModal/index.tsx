import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {useBooleanState} from '@renderer/hooks';
import {unsetManagedAccount} from '@renderer/store/app';
import {getActiveBankConfig, getManagedAccounts} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';
import {formatPathFromNode} from '@renderer/utils/address';

import './DeleteAccountModal.scss';

interface ComponentProps {
  accountNumber: string;
  toggleDeleteModal(): void;
}

const DeleteAccountModal: FC<ComponentProps> = ({accountNumber, toggleDeleteModal}) => {
  const activeBankConfig = useSelector(getActiveBankConfig);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const managedAccounts = useSelector(getManagedAccounts);
  const [submittingDeleteModal, , setSubmittingDeleteModalTrue, setSubmittingDeleteModalFalse] = useBooleanState(false);

  const handleSubmit = async (): Promise<void> => {
    setSubmittingDeleteModalTrue();
    const account = managedAccounts[accountNumber];
    dispatch(unsetManagedAccount(account));
    setSubmittingDeleteModalFalse();
    if (activeBankConfig) {
      history.push(`/banks/${formatPathFromNode(activeBankConfig)}/overview`);
    } else {
      toggleDeleteModal();
    }
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
      submitting={submittingDeleteModal}
    >
      <>
        <span className="DeleteAccountModal__warning-span">Warning: </span> If you delete your account, you will lose
        all the points in your account as well as your signing key. Are you sure you want to delete your account?
      </>
    </Modal>
  );
};

export default DeleteAccountModal;
