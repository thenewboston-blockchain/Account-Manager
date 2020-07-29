import React, {FC, ReactNode} from 'react';

import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';

import './EditBankModal.scss';

interface ComponentProps {
  close(): void;
}

const initialValues = {
  nickname: '',
};

type FormValues = typeof initialValues;

const EditBankModal: FC<ComponentProps> = ({close}) => {
  const handleSubmit = ({nickname}: FormValues): void => {
    console.log('nickname', nickname);
    close();
  };

  const renderHeader = (): ReactNode => {
    return (
      <>
        <h2 className="EditBankModal__title">Edit Bank Nickname</h2>
      </>
    );
  };

  return (
    <Modal
      className="EditBankModal"
      close={close}
      header={renderHeader()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
    >
      <FormInput label="Bank Nickname" name="nickname" />
    </Modal>
  );
};

export default EditBankModal;
