import React, {FC} from 'react';
import {useDispatch} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {unsetManagedValidator} from '@renderer/store/app';
import {AppDispatch, ManagedNode} from '@renderer/types';

interface ComponentProps {
  close(): void;
  validator: ManagedNode;
}

const RemoveValidatorModal: FC<ComponentProps> = ({close, validator}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (): Promise<void> => {
    dispatch(unsetManagedValidator(validator));
    close();
  };

  return (
    <Modal
      className="RemoveValidatorModal"
      close={close}
      header="Remove Validator"
      onSubmit={handleSubmit}
      submitButton="Yes"
    >
      Are you sure you want to remove this validator?
    </Modal>
  );
};

export default RemoveValidatorModal;
