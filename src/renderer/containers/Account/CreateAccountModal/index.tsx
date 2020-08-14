import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';

import {FormInput, FormRadio, FormTextArea} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {useBooleanState} from '@renderer/hooks';
import {getManagedAccounts} from '@renderer/selectors';
import {setManagedAccount} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {generateAccount} from '@renderer/utils/accounts';
import {getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';

import './CreateAccountModal.scss';

const initialValues = {
  nickname: '',
  signingKey: '',
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
  const [createNewAccount, toggleCreateNewAccount] = useBooleanState(true);

  const handleSubmit = ({nickname, signingKey}: FormValues): void => {
    const {accountNumberHex, signingKeyHex} = createNewAccount
      ? generateAccount()
      : getKeyPairFromSigningKeyHex(signingKey);

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
      ...(createNewAccount
        ? {}
        : {
            signingKey: Yup.string()
              .min(64, SIGNING_KEY_LENGTH_ERROR)
              .max(64, SIGNING_KEY_LENGTH_ERROR)
              .notOneOf(managedAccountSigningKeys, 'That account already exists')
              .required(SIGNING_KEY_REQUIRED_ERROR),
          }),
    });
  }, [createNewAccount, managedAccountNicknames, managedAccountSigningKeys]);

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
      <div className="CreateAccountModal__radio-container">
        <FormRadio
          checked={createNewAccount}
          label="Create New Account"
          name="create"
          onChange={toggleCreateNewAccount}
        />
        <FormRadio
          checked={!createNewAccount}
          label="Add Existing Account"
          name="add"
          onChange={toggleCreateNewAccount}
        />
      </div>
      <FormInput label="Nickname" name="nickname" />
      {!createNewAccount && <FormTextArea label="Signing Key" name="signingKey" required />}
    </Modal>
  );
};

export default CreateAccountModal;
