import React, {FC, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {createAccount} from '@renderer/store/old/accounts';
import {AppDispatch, RootState} from '@renderer/types/store';

const initialValues = {
  nickname: '',
};

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const AddAccountModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const nicknames = useSelector(
    (state: RootState) => state.old.accounts.map((account) => account.nickname).filter((nickname) => !!nickname),
    shallowEqual,
  );

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(createAccount(nickname));
    close();
  };

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        nickname: Yup.string().notOneOf(nicknames, 'That nickname is already taken'),
      }),
    [nicknames],
  );

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
