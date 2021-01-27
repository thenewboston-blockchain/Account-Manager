import React, {FC, useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

import Modal from '@renderer/components/Modal';
import {AXIOS_TIMEOUT_MS} from '@renderer/config';
import {INVALID_AMOUNT_ERROR} from '@renderer/constants/form-validation';
import {
  getAccountBalances,
  getActiveBankConfig,
  getActivePrimaryValidatorConfig,
  getAuthenticatedBanks,
  getBankConfigs,
} from '@renderer/selectors';
import {BaseValidator} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import {sendBlock} from '@renderer/utils/blocks';
import yup from '@renderer/utils/forms/yup';
import {generateSignedMessage, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';

import ConnectionStatus, {Status} from './ConnectionStatus';
import PurchaseConfirmationServicesModalFields, {FormValues} from './PurchaseConfirmationServicesModalFields';
import './PurchaseConfirmationServicesModal.scss';

interface ComponentProps {
  close(): void;
  initialBankAddress: string;
  validator: BaseValidator;
}

export interface KnownStatus {
  [key: string]: boolean;
}

const PurchaseConfirmationServicesModal: FC<ComponentProps> = ({close, initialBankAddress, validator}) => {
  const [connectionStatus, setConnectionStatus] = useState<Status | null>(null);
  const [knownStatuses, setKnownStatuses] = useState<KnownStatus>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const activeBank = useSelector(getActiveBankConfig)!;
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig)!;
  const authenticatedBanks = useSelector(getAuthenticatedBanks);
  const bankConfigs = useSelector(getBankConfigs);
  const accountBalances = useSelector(getAccountBalances);

  const checkConnectionBankToValidator = useCallback(
    async (bankAddress: string): Promise<void> => {
      try {
        await axios.get(`${bankAddress}/validators/${validator.node_identifier}`, {timeout: AXIOS_TIMEOUT_MS});
      } catch (error) {
        const managedBank = authenticatedBanks[bankAddress];
        if (!(managedBank && managedBank.nid_signing_key)) throw new Error('No NID SK');
        const {publicKeyHex, signingKey} = getKeyPairFromSigningKeyHex(managedBank.nid_signing_key);
        const validatorData = {
          account_number: validator.account_number,
          daily_confirmation_rate: validator.daily_confirmation_rate,
          ip_address: validator.ip_address,
          node_identifier: validator.node_identifier,
          protocol: validator.protocol,
          root_account_file: validator.root_account_file,
          root_account_file_hash: validator.root_account_file_hash,
          trust: 0,
          version: validator.version,
        };
        const signedMessage = generateSignedMessage(validatorData, publicKeyHex, signingKey);
        await axios.post(`${bankAddress}/validators`, signedMessage, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    },
    [authenticatedBanks, validator],
  );

  const checkConnectionValidatorToBank = useCallback(
    async (bankAddress: string): Promise<void> => {
      const {
        data: {node_identifier: nodeIdentifier},
      } = bankConfigs[bankAddress];
      const validatorAddress = formatAddressFromNode(validator);

      try {
        await axios.get(`${validatorAddress}/banks/${nodeIdentifier}`, {timeout: AXIOS_TIMEOUT_MS});
      } catch (error) {
        const managedBank = authenticatedBanks[bankAddress];
        if (!(managedBank && managedBank.nid_signing_key)) throw new Error('No NID SK');
        const {publicKeyHex, signingKey} = getKeyPairFromSigningKeyHex(managedBank.nid_signing_key);
        const connectionRequestData = {
          ip_address: managedBank.ip_address,
          port: managedBank.port,
          protocol: managedBank.protocol,
        };
        const signedMessage = generateSignedMessage(connectionRequestData, publicKeyHex, signingKey);
        await axios.post(`${validatorAddress}/connection_requests`, signedMessage, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    },
    [authenticatedBanks, bankConfigs, validator],
  );

  const handleSubmit = async ({amount, bankAddress}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      const selectedBank = authenticatedBanks[bankAddress];
      const {publicKeyHex: accountNumber} = getKeyPairFromSigningKeyHex(selectedBank.account_signing_key);
      const coinAmount = parseInt(amount, 10);
      await sendBlock(
        activeBank,
        activePrimaryValidator,
        coinAmount,
        selectedBank.account_signing_key,
        validator.account_number,
        accountNumber,
      );
      displayToast('Your payment has been sent', 'success');
      close();
    } catch (error) {
      displayErrorToast(error);
      setSubmitting(false);
    }
  };

  const testConnection = useCallback(
    async (address: string | any) => {
      if (!address) return true;
      const knownStatus = knownStatuses[address];
      if (knownStatus) return knownStatus;

      try {
        setConnectionStatus('checking');
        setSubmitting(true);

        await Promise.all([checkConnectionBankToValidator(address), checkConnectionValidatorToBank(address)]);

        setConnectionStatus('connected');
        setKnownStatuses({
          ...knownStatuses,
          [address]: true,
        });
        setSubmitting(false);
      } catch (error) {
        setConnectionStatus('not-connected');
        setKnownStatuses({
          ...knownStatuses,
          [address]: false,
        });
        setSubmitting(false);
      }

      return false;
    },
    [checkConnectionBankToValidator, checkConnectionValidatorToBank, knownStatuses],
  );

  const checkCoinsWithBalance = useCallback(
    (amount: number, bankAddress: string): boolean => {
      if (!amount || !bankAddress) return true;

      const selectedBank = authenticatedBanks[bankAddress];
      const {publicKeyHex: accountNumber} = getKeyPairFromSigningKeyHex(selectedBank.account_signing_key);

      const managedAccountBalance = accountBalances[accountNumber];
      if (!managedAccountBalance) return false;

      const totalCost =
        getBankTxFee(activeBank, accountNumber) +
        getPrimaryValidatorTxFee(activePrimaryValidator, accountNumber) +
        amount;

      return totalCost <= managedAccountBalance.balance;
    },
    [accountBalances, activeBank, activePrimaryValidator, authenticatedBanks],
  );

  const validationSchema = useMemo(() => {
    const bankAddressRef = yup.ref('bankAddress');

    return yup.object().shape({
      amount: yup
        .number()
        .callbackWithRef(bankAddressRef, checkCoinsWithBalance, INVALID_AMOUNT_ERROR)
        .moreThan(0, 'Amount must be greater than 0')
        .required('Amount is a required field'),
      bankAddress: yup
        .string()
        .test(
          'bank-has-unique-account-number',
          'The account number for this bank matches the validators account number.',
          (address) => {
            if (!address) return true;
            const selectedBank = authenticatedBanks[address];
            const {publicKeyHex: accountNumber} = getKeyPairFromSigningKeyHex(selectedBank.account_signing_key);
            return accountNumber !== validator.account_number;
          },
        )
        .test('bank-is-connected', '', testConnection)
        .required('This field is required'),
    });
  }, [authenticatedBanks, checkCoinsWithBalance, testConnection, validator.account_number]);

  const initialValues = useMemo(() => {
    return {
      amount: '',
      bankAddress: initialBankAddress,
    };
  }, [initialBankAddress]);

  return (
    <Modal
      className="PurchaseConfirmationServicesModal"
      close={close}
      header="Purchase Confirmation Services"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Purchase"
      submitting={submitting}
      validateOnMount
      validationSchema={validationSchema}
    >
      {connectionStatus && <ConnectionStatus status={connectionStatus} />}
      <PurchaseConfirmationServicesModalFields submitting={submitting} validator={validator} />
    </Modal>
  );
};

export default PurchaseConfirmationServicesModal;
