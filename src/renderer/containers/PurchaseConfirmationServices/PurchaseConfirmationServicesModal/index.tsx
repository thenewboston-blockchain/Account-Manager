import React, {FC, useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {INVALID_AMOUNT_ERROR} from '@renderer/constants/form-validation';
import {
  getAccountBalances,
  getActiveBankConfig,
  getPrimaryValidatorConfig,
  getAuthenticatedBanks,
  getBankConfigs,
} from '@renderer/selectors';
import {BaseValidator} from '@renderer/types';
import {sendBlock} from '@renderer/utils/blocks';
import yup from '@renderer/utils/forms/yup';
import {getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';

import ConnectionStatus from '../ConnectionStatus';
import {checkConnectionBankToValidator, checkConnectionValidatorToBank, ValidatorConnectionStatus} from '../utils';
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
  const [connectionStatus, setConnectionStatus] = useState<ValidatorConnectionStatus | null>(null);
  const [knownStatuses, setKnownStatuses] = useState<KnownStatus>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const activePrimaryValidator = useSelector(getPrimaryValidatorConfig)!;
  const authenticatedBanks = useSelector(getAuthenticatedBanks);
  const bankConfigs = useSelector(getBankConfigs);
  const accountBalances = useSelector(getAccountBalances);

  const handleSubmit = async ({amount, bankAddress}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      const selectedBank = authenticatedBanks[bankAddress];
      const {publicKeyHex: bankAccountNumber} = getKeyPairFromSigningKeyHex(selectedBank.account_signing_key);
      await sendBlock(activeBankConfig, activePrimaryValidator, selectedBank.account_signing_key, bankAccountNumber, [
        {accountNumber: validator.account_number, amount: parseInt(amount, 10)},
      ]);
      displayToast('Your payment has been sent', 'success');
      close();
    } catch (error) {
      displayErrorToast(error);
      setSubmitting(false);
    }
  };

  const testConnection = useCallback(
    async (bankAddress: string | any) => {
      if (!bankAddress) return true;
      const knownStatus = knownStatuses[bankAddress];
      if (knownStatus) return knownStatus;

      try {
        setConnectionStatus(ValidatorConnectionStatus.checking);
        setSubmitting(true);

        const managedBank = authenticatedBanks[bankAddress];
        const {
          data: {node_identifier: bankNodeIdentifier},
        } = bankConfigs[bankAddress];

        await Promise.all([
          checkConnectionBankToValidator(managedBank, validator),
          checkConnectionValidatorToBank(managedBank, validator, bankNodeIdentifier),
        ]);

        setConnectionStatus(ValidatorConnectionStatus.connected);
        setKnownStatuses({
          ...knownStatuses,
          [bankAddress]: true,
        });
        setSubmitting(false);
      } catch (error) {
        setConnectionStatus(ValidatorConnectionStatus.notConnected);
        setKnownStatuses({
          ...knownStatuses,
          [bankAddress]: false,
        });
        setSubmitting(false);
      }

      return false;
    },
    [authenticatedBanks, bankConfigs, knownStatuses, validator],
  );

  const checkCoinsWithBalance = useCallback(
    (amount: number, bankAddress: string): boolean => {
      if (!amount || !bankAddress) return true;

      const selectedBank = authenticatedBanks[bankAddress];
      const {publicKeyHex: accountNumber} = getKeyPairFromSigningKeyHex(selectedBank.account_signing_key);

      const managedAccountBalance = accountBalances[accountNumber];
      if (!managedAccountBalance) return false;

      const totalCost =
        getBankTxFee(activeBankConfig, accountNumber) +
        getPrimaryValidatorTxFee(activePrimaryValidator, accountNumber) +
        amount;

      return totalCost <= managedAccountBalance.balance;
    },
    [accountBalances, activeBankConfig, activePrimaryValidator, authenticatedBanks],
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
      {connectionStatus && <ConnectionStatus showDescription status={connectionStatus} />}
      <PurchaseConfirmationServicesModalFields submitting={submitting} validator={validator} />
    </Modal>
  );
};

export default PurchaseConfirmationServicesModal;
