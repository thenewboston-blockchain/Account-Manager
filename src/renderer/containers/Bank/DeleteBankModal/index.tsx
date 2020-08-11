import React, {FC} from 'react';

import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {useBooleanState} from '@renderer/hooks';

interface ComponentProps {
  toggleDeleteModal(): void;
}

const DeleteBankModal: FC<ComponentProps> = ({toggleDeleteModal}) => {
  const [submittingDeleteModal, , setSubmittingDeleteModalTrue, setSubmittingDeleteModalFalse] = useBooleanState(false);

  const handleDeleteAccountFromModal = async (): Promise<void> => {
    try {
      setSubmittingDeleteModalTrue();
      setTimeout(() => {
        setSubmittingDeleteModalFalse();
        toggleDeleteModal();
      }, 1000);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <Modal
      cancelButton="No"
      className="DeleteBankModal"
      close={toggleDeleteModal}
      header={
        <>
          <Icon className="DeleteBankModal__icon" icon={IconType.alert} />
          <h2 className="DeleteBankModal__title">Delete Account</h2>
        </>
      }
      onSubmit={handleDeleteAccountFromModal}
      submitButton="Yes"
      submitting={submittingDeleteModal}
    >
      <>
        <span className="DeleteBankModal__warning-span">Warning: </span> If you delete your account, you will lose all
        the points in your account as well as your signing key. Are you sure you want to delete your account?
      </>
    </Modal>
  );
};

export default DeleteBankModal;
