import React, {FC, useMemo} from 'react';
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
import yup from '@renderer/utils/yup';

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
    let [accountNumberStr, balanceStr, signingKeyStr] = ['', '0', ''];

    if (type === 'add') {
      try {
        const {accountNumberHex, signingKeyHex} = getKeyPairFromSigningKeyHex(signingKey);
        accountNumberStr = accountNumberHex;
        signingKeyStr = signingKeyHex;
        const {balance} = await fetchAccountBalance(accountNumberStr);
        balanceStr = balance;
      } catch (error) {
        console.error(error);
        return;
      }
    }

    if (type === 'create') {
      const {accountNumberHex, signingKeyHex} = generateAccount();
      accountNumberStr = accountNumberHex;
      signingKeyStr = signingKeyHex;
    }

    dispatch(
      setManagedAccount({
        account_number: accountNumberStr,
        balance: balanceStr,
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
