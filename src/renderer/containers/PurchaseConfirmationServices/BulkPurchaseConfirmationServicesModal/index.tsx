import React, {FC, useEffect, useMemo, useReducer, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {fetchBankConfig} from '@renderer/dispatchers/banks';
import {getActiveBankConfig, getPrimaryValidatorConfig} from '@renderer/selectors';
import {AppDispatch, ManagedNode} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import {sendBlock} from '@renderer/utils/blocks';
import {getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';

import BulkPurchaseConfirmationServicesModalFields from './BulkPurchaseConfirmationServicesModalFields';
import {SelectedValidatorState, ValidatorConnectionStatus, validatorFormReducer} from '../utils';
import './BulkPurchaseConfirmationServicesModal.scss';

interface ComponentProps {
  bank: ManagedNode;
  close(): void;
  selectedValidators: SelectedValidatorState;
}

const BulkPurchaseConfirmationServicesModal: FC<ComponentProps> = ({bank, close, selectedValidators}) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const primaryValidator = useSelector(getPrimaryValidatorConfig)!;

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formValues, dispatchFormValues] = useReducer(
    validatorFormReducer,
    Object.keys(selectedValidators).reduce(
      (acc, nodeIdentifier) => ({
        ...acc,
        [nodeIdentifier]: {amount: '', status: ValidatorConnectionStatus.checking},
      }),
      {},
    ),
  );

  useEffect(() => {
    const bankAddress = formatAddressFromNode(bank);
    dispatch(fetchBankConfig(bankAddress));
  }, [bank, dispatch]);

  const handleSubmit = async (): Promise<void> => {
    try {
      setSubmitting(true);
      const {publicKeyHex: bankAccountNumber} = getKeyPairFromSigningKeyHex(bank.account_signing_key);
      const recipients = Object.entries(formValues)
        .map(([nodeIdentifier, {amount}]) => {
          const validatorData = selectedValidators[nodeIdentifier];
          return {
            accountNumber: validatorData.account_number,
            amount: parseInt(amount, 10),
          };
        })
        .filter(({amount}) => !!amount);

      await sendBlock(activeBankConfig, primaryValidator, bank.account_signing_key, bankAccountNumber, recipients);
      displayToast(`You have purchased ${recipients.length} services`, 'success');
      close();
    } catch (error) {
      displayErrorToast(error);
      setSubmitting(false);
    }
  };

  const orderedValidatorNodeIdentifiers = useMemo(() => {
    return Object.entries(selectedValidators)
      .sort(([, {index: indexA}], [, {index: indexB}]) => {
        return indexA - indexB;
      })
      .map(([nodeIdentifier]) => nodeIdentifier);
  }, [selectedValidators]);

  return (
    <Modal
      className="BulkPurchaseConfirmationServicesModal"
      close={close}
      header="Purchase Confirmation Services"
      hideFooter
      submitting={submitting}
    >
      <BulkPurchaseConfirmationServicesModalFields
        selectedBank={bank}
        dispatchFormValues={dispatchFormValues}
        formValues={formValues}
        handleSubmit={handleSubmit}
        initialValidatorsData={selectedValidators}
        orderedNodeIdentifiers={orderedValidatorNodeIdentifiers}
        submitting={submitting}
      />
    </Modal>
  );
};

export default BulkPurchaseConfirmationServicesModal;
