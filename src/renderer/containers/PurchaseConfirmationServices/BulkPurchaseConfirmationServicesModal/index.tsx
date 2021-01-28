import React, {FC, useEffect, useMemo, useReducer, useState} from 'react';
import {useDispatch} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {fetchBankConfig} from '@renderer/dispatchers/banks';
import {AppDispatch, ManagedNode} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';

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
  const [submitting] = useState<boolean>(false);
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
        bank={bank}
        dispatchFormValues={dispatchFormValues}
        formValues={formValues}
        initialValidatorsData={selectedValidators}
        orderedNodeIdentifiers={orderedValidatorNodeIdentifiers}
        submitting={submitting}
      />
    </Modal>
  );
};

export default BulkPurchaseConfirmationServicesModal;
