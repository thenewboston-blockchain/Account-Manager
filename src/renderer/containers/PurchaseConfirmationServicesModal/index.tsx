import React, {FC, useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {fetchBankConfig} from '@renderer/dispatchers/banks';
import {getBankConfigs, getManagedAccounts, getManagedBanks} from '@renderer/selectors';
import {AppDispatch, BankConfig, BaseValidator} from '@renderer/types';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import yup from '@renderer/utils/yup';

import PurchaseConfirmationServicesModalFields from './PurchaseConfirmationServicesModalFields';
import './PurchaseConfirmationServicesModal.scss';

interface ComponentProps {
  close(): void;
  validator: BaseValidator;
}

const PurchaseConfirmationServicesModal: FC<ComponentProps> = ({close, validator}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
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

  const handleSubmit = async ({bankAddress}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      displayToast(bankAddress, 'success');
      close();
    } catch (error) {
      displayErrorToast(error);
      setSubmitting(false);
    }
  };

  const bankSigningKey = useCallback(
    (bankConfig: BankConfig): string | null => {
      const bankAccountNumber = bankConfig?.account_number;
      const managedAccount = managedAccounts[bankAccountNumber];
      return managedAccount ? managedAccount.signing_key : null;
    },
    [managedAccounts],
  );

  const testBankHasSigningKey = useCallback(
    async (address: string) => {
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
        }
      }

      return !!bankSigningKey(bankConfig?.data);
    },
    [bankConfigs, bankSigningKey, dispatch],
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      amount: yup.number().moreThan(0, 'Amount must be greater than 0').required('Amount is a required field'),
      bankAddress: yup
        .string()
        .test('bank-has-sk', 'Signing key required to purchase confirmation services.', testBankHasSigningKey)
        .test('bank-has-nid-sk', 'NID signing key required to purchase confirmation services.', (address) => {
          const managedBank = managedBanks[address];
          return !!(managedBank && managedBank.nid_signing_key);
        })
        .required('This field is required'),
    });
  }, [managedBanks, testBankHasSigningKey]);

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
      <PurchaseConfirmationServicesModalFields submitting={submitting} validator={validator} />
    </Modal>
  );
};

export default PurchaseConfirmationServicesModal;
