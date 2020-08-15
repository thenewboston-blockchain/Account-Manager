import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';

import Modal from '@renderer/components/Modal';
import {getManagedAccounts} from '@renderer/selectors';
import {setManagedAccount} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {generateAccount} from '@renderer/utils/accounts';
import {getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';

import CreateAccountModalFields from './CreateAccountModalFields';
import './CreateAccountModal.scss';

const initialValues = {
  nickname: '',
  signingKey: '',
  type: 'create',
};

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const CreateAccountModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedAccountNicknames = useMemo(
    () =>
      Object.values(managedAccounts)
        .filter(({nickname}) => !!nickname)
        .map(({nickname}) => nickname),
    [managedAccounts],
  );
  const managedAccountSigningKeys = useMemo(
    () =>
      Object.values(managedAccounts)
        .filter(({signing_key}) => !!signing_key)
        .map(({signing_key}) => signing_key),
    [managedAccounts],
  );

  const handleSubmit = ({nickname, signingKey, type}: FormValues): void => {
    const {accountNumberHex, signingKeyHex} =
      type === 'create' ? generateAccount() : getKeyPairFromSigningKeyHex(signingKey);

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

  const validationSchema = useMemo(() => {
    const SIGNING_KEY_LENGTH_ERROR = 'Signing key must be 64 characters long';
    const SIGNING_KEY_REQUIRED_ERROR = 'Signing key is required';

    return Yup.object().shape({
      nickname: Yup.string().notOneOf(managedAccountNicknames, 'That nickname is already taken'),
      signingKey: Yup.string().when('type', {
        is: 'create',
        otherwise: Yup.string()
          .length(64, SIGNING_KEY_LENGTH_ERROR)
          .notOneOf(managedAccountSigningKeys, 'That account already exists')
          .required(SIGNING_KEY_REQUIRED_ERROR),
        then: Yup.string(),
      }),
      type: Yup.string(),
    });
  }, [managedAccountNicknames, managedAccountSigningKeys]);

  return (
    <Modal
      className="CreateAccountModal"
      close={close}
      header="Create/Add Account"
      ignoreDirty
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Create"
      validationSchema={validationSchema}
    >
      <CreateAccountModalFields />
    </Modal>
  );
};

export default CreateAccountModal;
