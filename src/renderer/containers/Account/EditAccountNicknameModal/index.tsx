import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';
import {setManagedAccount} from '@renderer/store/app';
import {AppDispatch, ManagedAccount} from '@renderer/types';

interface ComponentProps {
  close(): void;
  managedAccount: ManagedAccount;
}

const EditAccountNicknameModal: FC<ComponentProps> = ({close, managedAccount}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    nickname: managedAccount.nickname,
  };
  type FormValues = typeof initialValues;

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedAccount({
        ...managedAccount,
        nickname,
      }),
    );
    close();
  };

  return (
    <Modal
      cancelButton="Cancel"
      close={close}
      header="Edit Account Nickname"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
    >
      <FormInput focused label="Account Nickname" name="nickname" />
    </Modal>
  );
};

export default EditAccountNicknameModal;
