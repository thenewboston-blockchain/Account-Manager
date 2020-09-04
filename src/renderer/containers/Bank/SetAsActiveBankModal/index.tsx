import React, {FC, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Modal from '@renderer/components/Modal';
import {connectAndStoreLocalData} from '@renderer/dispatchers/app';
import {AppDispatch, ManagedNode} from '@renderer/types';
import {formatPathFromNode} from '@renderer/utils/address';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';

interface ComponentProps {
  bank: ManagedNode;
  close(): void;
}

const SetAsActiveBankModal: FC<ComponentProps> = ({bank, close}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const handleSubmit = async (): Promise<void> => {
    try {
      setSubmitting(true);
      const response = await dispatch(connectAndStoreLocalData(bank, bank.nickname));
      if (response?.error) {
        displayErrorToast(response.error);
        setSubmitting(false);
        return;
      }
      if (response?.bankConfig) {
        history.push(`/bank/${formatPathFromNode(response.bankConfig)}/overview`);
      }
      close();
    } catch (error) {
      displayToast('An error occurred');
      setSubmitting(false);
    }
  };

  return (
    <Modal
      className="SetAsActiveBank"
      close={close}
      header="Set as Active Bank"
      onSubmit={handleSubmit}
      submitButton="Yes"
      submitting={submitting}
    >
      Account transaction histories may be lost when setting a new active bank. Are you sure you would like to set this
      bank as your new active bank?
    </Modal>
  );
};

export default SetAsActiveBankModal;
