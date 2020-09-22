import React, {FC} from 'react';
import {useDispatch} from 'react-redux';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {setManagedBank} from '@renderer/store/app';
import {AppDispatch, ManagedNode} from '@renderer/types';

interface ComponentProps {
  bank: ManagedNode;
  close(): void;
}

const EditBankNicknameModal: FC<ComponentProps> = ({bank, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues = {
    nickname: bank.nickname,
  };

  type FormValues = typeof initialValues;

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedBank({
        ...bank,
        nickname,
      }),
    );
    close();
  };

  return (
    <Modal
      className="EditBankNicknameModal"
      close={close}
      header="Edit Bank Nickname"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
    >
      <FormInput focused label="Bank Nickname" name="nickname" />
    </Modal>
  );
};

export default EditBankNicknameModal;
