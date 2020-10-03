import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {FormTextArea} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {SIGNING_KEY_LENGTH_ERROR, SIGNING_KEY_REQUIRED_ERROR} from '@renderer/constants/form-validation';
import {useAddress} from '@renderer/hooks';
import {getBankConfigs, getManagedAccounts, getManagedBanks} from '@renderer/selectors';
import {setManagedBank} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {displayToast} from '@renderer/utils/toast';
import yup from '@renderer/utils/yup';

interface ComponentProps {
  close(): void;
}

const AddBankSigningKeysModal: FC<ComponentProps> = ({close}) => {
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const bankConfigs = useSelector(getBankConfigs);
  const {
    data: {account_number: accountNumber, node_identifier: nodeIdentifier},
  } = bankConfigs[address];
  const managedBanks = useSelector(getManagedBanks);
  const managedBank = managedBanks[address];
  const managedAccounts = useSelector(getManagedAccounts);

  const initialValues = {
    accountSigningKey:
      Object.values(managedAccounts).find((macc) => macc.account_number === accountNumber)?.signing_key ||
      managedBank.acc_signing_key,
    nidSigningKey: managedBank.nid_signing_key,
  };

  type FormValues = typeof initialValues;

  const headerTitle = useMemo(() => {
    const prefix = !!managedBank.acc_signing_key && !!managedBank.nid_signing_key ? 'Edit' : 'Add';
    return `${prefix} Signing Keys`;
  }, [managedBank]);

  const handleSubmit = ({accountSigningKey, nidSigningKey}: FormValues): void => {
    dispatch(
      setManagedBank({
        ...managedBank,
        acc_signing_key: accountSigningKey,
        nid_signing_key: nidSigningKey,
      }),
    );
    displayToast('Bank is now authenticated', 'success');
    close();
  };

  const checkPrivateSigningKey = (publicKey: string, privateKey: string): boolean => {
    try {
      const {publicKeyHex} = getKeyPairFromSigningKeyHex(privateKey);
      return publicKeyHex === publicKey;
    } catch (error) {
      return false;
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      accountSigningKey: yup
        .string()
        .length(64, SIGNING_KEY_LENGTH_ERROR)
        .required(SIGNING_KEY_REQUIRED_ERROR)
        .test({
          message: 'Resulting public key does not match Account',
          name: 'is-valid-private-key-account',
          test: (key: string) => {
            return checkPrivateSigningKey(accountNumber, key);
          },
        }),
      nidSigningKey: yup
        .string()
        .length(64, SIGNING_KEY_LENGTH_ERROR)
        .required(SIGNING_KEY_REQUIRED_ERROR)
        .test({
          message: 'Resulting public key does not match NID',
          name: 'is-valid-private-key-nid',
          test: (key: string) => {
            return checkPrivateSigningKey(nodeIdentifier, key);
          },
        }),
    });
  }, [accountNumber, nodeIdentifier]);

  return (
    <Modal
      close={close}
      header={headerTitle}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
      validationSchema={validationSchema}
    >
      <FormTextArea focused label="Bank NID Signing Key" name="nidSigningKey" required />
      <FormTextArea label="Bank Account Signing Key" name="accountSigningKey" required />
    </Modal>
  );
};

export default AddBankSigningKeysModal;
