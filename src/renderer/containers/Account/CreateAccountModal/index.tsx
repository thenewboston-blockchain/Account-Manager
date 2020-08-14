import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {getManagedAccounts} from '@renderer/selectors';
import {setManagedAccount} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
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
  const managedAccounts = useSelector(getManagedAccounts);
  const nicknames = Object.values(managedAccounts).filter(({nickname}) => !!nickname);

  const handleSubmit = ({nickname}: FormValues): void => {
    const {accountNumberHex, signingKeyHex} = generateAccount();
    dispatch(
      setManagedAccount({
        account_number: accountNumberHex,
        balance: '',
        nickname,
        signing_key: signingKeyHex,
      }),
    );
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
      header="Create/Add Account"
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
