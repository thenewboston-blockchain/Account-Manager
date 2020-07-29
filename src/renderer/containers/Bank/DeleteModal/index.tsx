import React, {FC} from 'react';

import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import useBooleanState from '@renderer/hooks/useBooleanState';

interface ComponentProps {
  toggleDeleteModal(): void;
}

const DeleteModal: FC<ComponentProps> = ({toggleDeleteModal}) => {
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
      className="BankDeleteModal"
      close={toggleDeleteModal}
      header={
        <>
          <Icon className="BankDeleteModal__icon" icon={IconType.alert}/>
          <h2 className="BankDeleteModal__title">Delete Account</h2>
        </>
      }
      onSubmit={handleDeleteAccountFromModal}
      submitButton="Yes"
      submitting={submittingDeleteModal}
    >
      <>
        <span className="BankDeleteModal__warning-span">Warning: </span> If you delete your account, you will lose all
        the points in your account as well as your signing key. Are you sure you want to delete your account?
      </>
    </Modal>
  );
};

export default DeleteModal;
