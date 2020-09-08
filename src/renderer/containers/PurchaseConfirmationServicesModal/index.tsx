import React, {FC, useMemo, useState} from 'react';

import Modal from '@renderer/components/Modal';
import {BaseValidator} from '@renderer/types';
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

  const initialValues = useMemo(
    () => ({
      bankAccountNumber: '123',
    }),
    [],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async ({bankAccountNumber}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      displayToast(bankAccountNumber, 'success');
      close();
    } catch (error) {
      displayErrorToast(error);
      setSubmitting(false);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      bankAccountNumber: yup.string().required('This field is required'),
    });
  }, []);

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
      <PurchaseConfirmationServicesModalFields validator={validator} />
    </Modal>
  );
};

export default PurchaseConfirmationServicesModal;
