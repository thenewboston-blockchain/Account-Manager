import React, {FC} from 'react';
import {useDispatch} from 'react-redux';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {setManagedValidator} from '@renderer/store/app';
import {AppDispatch, ManagedNode} from '@renderer/types';

interface ComponentProps {
  close(): void;
  validator: ManagedNode;
}

const EditValidatorNicknameModal: FC<ComponentProps> = ({close, validator}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues = {
    nickname: validator.nickname,
  };

  type FormValues = typeof initialValues;

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedValidator({
        ...validator,
        nickname,
      }),
    );
    close();
  };

  return (
    <Modal
      className="EditValidatorNicknameModal"
      close={close}
      header="Edit Validator Nickname"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
    >
      <FormInput label="Validator Nickname" name="nickname" />
    </Modal>
  );
};

export default EditValidatorNicknameModal;
