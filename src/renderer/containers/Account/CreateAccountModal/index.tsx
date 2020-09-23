import React, {FC, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import Modal from '@renderer/components/Modal';
import {SIGNING_KEY_LENGTH_ERROR, SIGNING_KEY_REQUIRED_ERROR} from '@renderer/constants/form-validation';
import {getActivePrimaryValidator, getManagedAccounts} from '@renderer/selectors';
import {setManagedAccount} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {generateAccount} from '@renderer/utils/accounts';
import {formatAddress} from '@renderer/utils/address';
import {getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import yup from '@renderer/utils/yup';

import CreateAccountModalFields, {initialValues, FormValues} from './CreateAccountModalFields';
import './CreateAccountModal.scss';

interface ComponentProps {
  close(): void;
  isGetStartedModal?: boolean;
}

const CreateAccountModal: FC<ComponentProps> = ({close, isGetStartedModal = false}) => {
  const [isCreatingNewAccount, setIsCreatingNewAccount] = useState<boolean>(true);
  const activePrimaryValidator = useSelector(getActivePrimaryValidator)!;
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

  const fetchAccountBalance = async (accountNumber: string) => {
    const {ip_address: ipAddress, port, protocol} = activePrimaryValidator;
    const address = formatAddress(ipAddress, port, protocol);
    const {data} = await axios.get(`${address}/accounts/${accountNumber}/balance`);
    return data;
  };

  const handleSubmit = async ({nickname, signingKey, type}: FormValues): Promise<void> => {
    let [accountNumberStr, balance, signingKeyStr] = ['', 0, ''];

    if (type === 'add') {
      try {
        const {publicKeyHex, signingKeyHex} = getKeyPairFromSigningKeyHex(signingKey);
        accountNumberStr = publicKeyHex;
        signingKeyStr = signingKeyHex;
        const {balance: accountBalance} = await fetchAccountBalance(accountNumberStr);
        balance = accountBalance;
        displayToast('You successfully added an account!', 'success');
      } catch (error) {
        displayErrorToast(error);
        return;
      }
    }

    if (type === 'create') {
      const {publicKeyHex, signingKeyHex} = generateAccount();
      accountNumberStr = publicKeyHex;
      signingKeyStr = signingKeyHex;
      displayToast('You successfully created an account!', 'success');
    }

    dispatch(
      setManagedAccount({
        account_number: accountNumberStr,
        balance: balance || 0,
        nickname,
        signing_key: signingKeyStr,
      }),
    );

    history.push(`/account/${accountNumberStr}/overview`);
    close();
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      nickname: yup.string().notOneOf(managedAccountNicknames, 'That nickname is already taken'),
      signingKey: yup.string().when('type', {
        is: 'create',
        otherwise: yup
          .string()
          .length(64, SIGNING_KEY_LENGTH_ERROR)
          .notOneOf(managedAccountSigningKeys, 'That account already exists')
          .required(SIGNING_KEY_REQUIRED_ERROR),
        then: yup.string(),
      }),
      type: yup.string(),
    });
  }, [managedAccountNicknames, managedAccountSigningKeys]);

  return (
    <Modal
      className="CreateAccountModal"
      close={close}
      disableOverlayClick={isGetStartedModal}
      displayCancelButton={!isGetStartedModal}
      displayCloseButton={!isGetStartedModal}
      header={isGetStartedModal ? 'Get Started' : 'Create/Add Account'}
      ignoreDirty
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton={isCreatingNewAccount ? 'Create' : 'Add'}
      validationSchema={validationSchema}
    >
      <CreateAccountModalFields setIsCreatingNewAccount={setIsCreatingNewAccount} />
    </Modal>
  );
};

export default CreateAccountModal;
