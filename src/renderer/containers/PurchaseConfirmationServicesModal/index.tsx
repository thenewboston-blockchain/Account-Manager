import React, {FC} from 'react';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';

import './PurchaseConfirmationServicesModal.scss';

interface ComponentProps {
  close(): void;
}

const PurchaseConfirmationServicesModal: FC<ComponentProps> = ({close}) => {
  return (
    <Modal
      className="PurchaseConfirmationServicesModal"
      close={close}
      header="Purchase Confirmation Services"
      initialValues={{}}
      onSubmit={() => {}}
      submitButton="Purchase"
      submitting={false}
      validationSchema={{}}
    >
      <FormInput focused label="Trust" name="trust" required type="number" />
    </Modal>
  );
};

export default PurchaseConfirmationServicesModal;
