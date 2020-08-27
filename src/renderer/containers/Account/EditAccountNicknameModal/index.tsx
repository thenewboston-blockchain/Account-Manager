import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';
import {setManagedAccount} from '@renderer/store/app';
import {AppDispatch, ManagedAccount} from '@renderer/types';

interface ComponentProps {
  account: ManagedAccount;
  close(): void;
}

const EditAccountNicknameModal: FC<ComponentProps> = ({account, close}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    nickname: account.nickname,
  };
  type FormValues = typeof initialValues;

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedAccount({
        ...account,
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
