import React, {FC} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {createAccount} from '@renderer/store/accounts';
import {RootState} from '@renderer/types/store';

const initialValues = {
  nickname: '',
};

type FormValues = typeof initialValues;

// TODO: Make it unique if inputted
const validationSchema = Yup.object().shape({
  nickname: Yup.string(),
});

interface ComponentProps {
  close(): void;
}

const AddAccountModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch();
  const accounts = useSelector((state: RootState) => state.accounts, shallowEqual);

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(createAccount(nickname));
    close();
  };

  return (
    <Modal
      close={close}
      header="Create Account"
      ignoreDirty
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Create"
      validationSchema={validationSchema}
    >
      <FormInput label="Account Nickname" name="nickname" />
    </Modal>
  );
};

export default AddAccountModal;
