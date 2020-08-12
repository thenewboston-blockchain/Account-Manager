import React, {FC, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {createAccount} from '@renderer/store/old/accounts';
import {AppDispatch, RootState} from '@renderer/types';
import {generateAccount} from '@renderer/utils/accounts';

const initialValues = {
  nickname: '',
};

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const CreateAccountModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const nicknames = useSelector(
    (state: RootState) => state.old.accounts.map((account) => account.nickname).filter((nickname) => !!nickname),
    shallowEqual,
  );

  const handleSubmit = ({nickname}: FormValues): void => {
    const {accountNumberHex, signingKeyHex} = generateAccount();
    dispatch(createAccount(accountNumberHex, nickname, signingKeyHex));
    history.push(`/account/${accountNumberHex}/overview`);
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

export default CreateAccountModal;
