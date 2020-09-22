import React, {FC} from 'react';
import {useDispatch} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {unsetManagedBank} from '@renderer/store/app';
import {AppDispatch, ManagedNode} from '@renderer/types';

interface ComponentProps {
  bank: ManagedNode;
  close(): void;
}

const RemoveBankModal: FC<ComponentProps> = ({bank, close}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (): Promise<void> => {
    dispatch(unsetManagedBank(bank));
    close();
  };

  return (
    <Modal className="RemoveBankModal" close={close} header="Remove Bank" onSubmit={handleSubmit} submitButton="Yes">
      Are you sure you want to remove this bank?
    </Modal>
  );
};

export default RemoveBankModal;
