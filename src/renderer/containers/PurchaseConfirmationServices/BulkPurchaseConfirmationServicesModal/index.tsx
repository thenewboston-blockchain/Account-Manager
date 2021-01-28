import React, {FC, useMemo, useReducer, useState} from 'react';

import Modal from '@renderer/components/Modal';
import {ManagedNode} from '@renderer/types';

import BulkPurchaseConfirmationServicesModalFields from './BulkPurchaseConfirmationServicesModalFields';
import {SelectedValidatorState, ValidatorConnectionStatus, validatorFormReducer} from '../utils';
import './BulkPurchaseConfirmationServicesModal.scss';

interface ComponentProps {
  bank: ManagedNode;
  close(): void;
  selectedValidators: SelectedValidatorState;
}

const BulkPurchaseConfirmationServicesModal: FC<ComponentProps> = ({bank, close, selectedValidators}) => {
  const [submitting] = useState<boolean>(false);
  const [formValues, dispatchFormValues] = useReducer(
    validatorFormReducer,
    Object.keys(selectedValidators).reduce(
      (acc, nodeIdentifier) => ({
        ...acc,
        [nodeIdentifier]: {amount: '', status: ValidatorConnectionStatus.notConnected},
      }),
      {},
    ),
  );

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
