import React, {FC} from 'react';
import noop from 'lodash/noop';
import Modal from '@renderer/components/Modal';

interface ComponentProps {
  close(): void;
}

const AddAccountModal: FC<ComponentProps> = ({close}) => {
  return (
    <Modal close={close} onSubmit={noop}>
      Modal
    </Modal>
  );
};

export default AddAccountModal;
