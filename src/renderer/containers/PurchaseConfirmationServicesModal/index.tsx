import React, {FC, useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import Modal from '@renderer/components/Modal';
import {INVALID_AMOUNT_ERROR} from '@renderer/containers/SendPointsModal/SendPointsModalFields';
import {AXIOS_TIMEOUT_MS} from '@renderer/config';
import {fetchBankConfig} from '@renderer/dispatchers/banks';
import {
  getActiveBankConfig,
  getActivePrimaryValidatorConfig,
  getBankConfigs,
  getManagedAccounts,
  getManagedBanks,
} from '@renderer/selectors';
import {AppDispatch, BankConfig, BaseValidator} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import {sendBlock} from '@renderer/utils/blocks';
import {generateSignedMessage, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';
import yup from '@renderer/utils/yup';

import ConnectionStatus from './ConnectionStatus';
import PurchaseConfirmationServicesModalFields from './PurchaseConfirmationServicesModalFields';
import './PurchaseConfirmationServicesModal.scss';

interface ComponentProps {
  close(): void;
  validator: BaseValidator;
}

export interface KnownConnectionStatus {
  [key: string]: boolean;
}

const PurchaseConfirmationServicesModal: FC<ComponentProps> = ({close, validator}) => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'not-connected' | null>(null);
  const [knownConnectionStatuses, setKnownConnectionStatuses] = useState<KnownConnectionStatus>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const activeBank = useSelector(getActiveBankConfig)!;
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig)!;
  const bankConfigs = useSelector(getBankConfigs);
  const dispatch = useDispatch<AppDispatch>();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedBanks = useSelector(getManagedBanks);

  const initialValues = useMemo(
    () => ({
      amount: '',
      bankAddress: '',
    }),
    [],
  );

  type FormValues = typeof initialValues;

  const bankSigningKey = useCallback(
    (bankConfig: BankConfig): string | null => {
      const bankAccountNumber = bankConfig?.account_number;
      const managedAccount = managedAccounts[bankAccountNumber];
      return managedAccount ? managedAccount.signing_key : null;
    },
    [managedAccounts],
  );

  const checkConnectionBankToValidator = useCallback(
    async (bankAddress: string): Promise<void> => {
      try {
        await axios.get(`${bankAddress}/validators/${validator.node_identifier}`, {timeout: AXIOS_TIMEOUT_MS});
      } catch (error) {
        const managedBank = managedBanks[bankAddress];
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
    [managedBanks, validator],
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
        const managedBank = managedBanks[bankAddress];
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
    [bankConfigs, managedBanks, validator],
  );

  const handleSubmit = async ({amount, bankAddress}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      const {
        data: {account_number: accountNumber},
      } = bankConfigs[bankAddress];
      const pointAmount = parseInt(amount, 10);
      await sendBlock(
        activeBank,
        activePrimaryValidator,
        managedAccounts,
        pointAmount,
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

  const testBankHasSigningKey = useCallback(
    async (address: string) => {
      if (!address) return true;
      const bankConfig = bankConfigs[address];

      if (!bankConfig) {
        try {
          setSubmitting(true);
          const {data, error} = await dispatch(fetchBankConfig(address));

          if (error) {
            displayErrorToast(error);
            setSubmitting(false);
            return false;
          }

          return data ? !!bankSigningKey(data) : false;
        } catch (error) {
          setSubmitting(false);
          return false;
        } finally {
          setSubmitting(false);
        }
      }

      return !!bankSigningKey(bankConfig?.data);
    },
    [bankConfigs, bankSigningKey, dispatch],
  );

  const testConnection = useCallback(
    async (address: string) => {
      if (!address) return true;
      const knownStatus = knownConnectionStatuses[address];
      if (knownStatus) return knownStatus;

      try {
        setConnectionStatus('checking');
        setSubmitting(true);

        await checkConnectionBankToValidator(address);
        await checkConnectionValidatorToBank(address);

        setConnectionStatus('connected');
        setKnownConnectionStatuses({
          ...knownConnectionStatuses,
          [address]: true,
        });
        setSubmitting(false);
      } catch (error) {
        setConnectionStatus('not-connected');
        setKnownConnectionStatuses({
          ...knownConnectionStatuses,
          [address]: false,
        });
        setSubmitting(false);
      }

      return false;
    },
    [checkConnectionBankToValidator, checkConnectionValidatorToBank, knownConnectionStatuses],
  );

  const checkPointsWithBalance = useCallback(
    (amount: number, bankAddress: string): boolean => {
      if (!amount || !bankAddress) return true;

      const {
        data: {account_number: accountNumber},
      } = bankConfigs[bankAddress];
      const {balance} = managedAccounts[accountNumber];

      const totalCost =
        getBankTxFee(activeBank, accountNumber) +
        getPrimaryValidatorTxFee(activePrimaryValidator, accountNumber) +
        amount;

      return totalCost <= balance;
    },
    [activeBank, activePrimaryValidator, bankConfigs, managedAccounts],
  );

  const validationSchema = useMemo(() => {
    const bankAddressRef = yup.ref('bankAddress');

    return yup.object().shape({
      amount: yup
        .number()
        .callbackWithRef(bankAddressRef, checkPointsWithBalance, INVALID_AMOUNT_ERROR)
        .moreThan(0, 'Amount must be greater than 0')
        .required('Amount is a required field'),
      bankAddress: yup
        .string()
        .test('bank-has-sk', 'Signing key required to purchase confirmation services.', testBankHasSigningKey)
        .test('bank-has-nid-sk', 'NID signing key required to purchase confirmation services.', (address) => {
          if (!address) return true;
          const managedBank = managedBanks[address];
          return !!(managedBank && managedBank.nid_signing_key);
        })
        .test(
          'bank-has-unique-account-number',
          'The account number for this bank matches the validators account number.',
          (address) => {
            if (!address) return true;
            const {
              data: {account_number: accountNumber},
            } = bankConfigs[address];
            return accountNumber !== validator.account_number;
          },
        )
        .test('bank-is-connected', '', testConnection)
        .required('This field is required'),
    });
  }, [bankConfigs, managedBanks, checkPointsWithBalance, testBankHasSigningKey, testConnection, validator]);

  return (
    <Modal
      className="PurchaseConfirmationServicesModal"
      close={close}
      header="Purchase Confirmation Services"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Purchase"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      {connectionStatus && <ConnectionStatus status={connectionStatus} />}
      <PurchaseConfirmationServicesModalFields submitting={submitting} validator={validator} />
    </Modal>
  );
};

export default PurchaseConfirmationServicesModal;
