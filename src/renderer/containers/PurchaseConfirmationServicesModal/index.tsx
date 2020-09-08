import React, {FC, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {FormSelectDetailed} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {getManagedBanks} from '@renderer/selectors';
import {InputOption} from '@renderer/types';

import './PurchaseConfirmationServicesModal.scss';

interface ComponentProps {
  close(): void;
}

const PurchaseConfirmationServicesModal: FC<ComponentProps> = ({close}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const managedBanks = useSelector(getManagedBanks);

  const getFromOptions = useMemo<InputOption[]>(
    () =>
      Object.values(managedBanks).map(({ip_address, nickname}) => ({
        label: nickname,
        value: ip_address,
      })),
    [managedBanks],
  );

  return (
    <Modal
      className="PurchaseConfirmationServicesModal"
      close={close}
      header="Purchase Confirmation Services"
      initialValues={{}}
      onSubmit={() => {}}
      submitButton="Purchase"
      submitting={submitting}
      validationSchema={{}}
    >
      <FormSelectDetailed
        className="SendPointsModal__select"
        disabled={submitting}
        focused
        required
        label="From: Managed Bank"
        options={getFromOptions}
        name="managedBank"
      />
    </Modal>
  );
};

export default PurchaseConfirmationServicesModal;
