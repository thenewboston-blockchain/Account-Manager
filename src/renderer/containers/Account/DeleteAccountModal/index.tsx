import React, {FC} from 'react';

import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import useBooleanState from '@renderer/hooks/useBooleanState';

import './DeleteAccountModal.scss';

interface ComponentProps {
  toggleDeleteModal(): void;
}

const DeleteAccountModal: FC<ComponentProps> = ({toggleDeleteModal}) => {
  const [submittingDeleteModal, , setSubmittingDeleteModalTrue, setSubmittingDeleteModalFalse] = useBooleanState(false);

  const handleSubmit = async (): Promise<void> => {
    setSubmittingDeleteModalTrue();
    setTimeout(() => {
      setSubmittingDeleteModalFalse();
      toggleDeleteModal();
    }, 1000);
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
