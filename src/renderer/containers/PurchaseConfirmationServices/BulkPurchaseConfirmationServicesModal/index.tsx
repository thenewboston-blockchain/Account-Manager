import React, {FC, useMemo, useState} from 'react';

import Modal from '@renderer/components/Modal';
import {displayErrorToast} from '@renderer/utils/toast';

import BulkPurchaseConfirmationServicesModalFields, {FormValues} from './BulkPurchaseConfirmationServicesModalFields';
import {SelectedValidatorState} from '../utils';
import './BulkPurchaseConfirmationServicesModal.scss';

interface ComponentProps {
  close(): void;
  selectedValidators: SelectedValidatorState;
}

const BulkPurchaseConfirmationServicesModal: FC<ComponentProps> = ({close, selectedValidators}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const orderedValidators = useMemo(() => {
    return Object.entries(selectedValidators)
      .sort(([, positionA], [, positionB]) => {
        return positionA - positionB;
      })
      .map(([nodeIdentifier]) => nodeIdentifier);
  }, [selectedValidators]);

  const initialValues = useMemo<FormValues>(() => {
    return {
      validators: orderedValidators.map((nodeIdentifier) => {
        return {
          amount: '',
          nodeIdentifier,
        };
      }),
    };
  }, [orderedValidators]);

  const handleSubmit = async ({validators}: FormValues): Promise<void> => {
    try {
      // TODO: update this logic
      if (validators) {
        setSubmitting(true);
      }
    } catch (error) {
      displayErrorToast(error);
      setSubmitting(false);
    }
  };

  return (
    <Modal
      className="BulkPurchaseConfirmationServicesModal"
      close={close}
      header="Purchase Confirmation Services"
      hideFooter
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitting={submitting}
    >
      <BulkPurchaseConfirmationServicesModalFields submitting={submitting} />
    </Modal>
  );
};

export default BulkPurchaseConfirmationServicesModal;
