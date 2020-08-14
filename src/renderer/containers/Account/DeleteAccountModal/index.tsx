import React, {FC} from 'react';
import {useDispatch} from 'react-redux';

import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {useBooleanState} from '@renderer/hooks';
import {unsetManagedAccount} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';

import './DeleteAccountModal.scss';

interface ComponentProps {
  toggleDeleteModal(): void;
}

const DeleteAccountModal: FC<ComponentProps> = ({toggleDeleteModal}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [submittingDeleteModal, , setSubmittingDeleteModalTrue, setSubmittingDeleteModalFalse] = useBooleanState(false);

  const handleSubmit = async (): Promise<void> => {
    setSubmittingDeleteModalTrue();
    dispatch(
      unsetManagedAccount({
        account_number: 'd5bf1ce33cbc075ad2f7bd39f174edb81bc82620ec8204e2f731661c81845a6a',
        balance: '',
        nickname: 'tunafish',
        signing_key: 'c198c0361032578282de2fa850088439153cab8d869e7aab74d5a61c3c4905d0',
      }),
    );
    setSubmittingDeleteModalFalse();
    toggleDeleteModal();
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
