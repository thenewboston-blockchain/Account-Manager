import React, {FC, ReactNode} from 'react';
import {useDispatch} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';
import {useAddress} from '@renderer/hooks';
import {setManagedBank} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {parseAddressData} from '@renderer/utils/address';

import './EditBankModal.scss';

interface ComponentProps {
  close(): void;
}

const initialValues = {
  nickname: '',
};

type FormValues = typeof initialValues;

const EditBankModal: FC<ComponentProps> = ({close}) => {
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = ({nickname}: FormValues): void => {
    const {ipAddress, port, protocol} = parseAddressData(address);
    dispatch(
      setManagedBank({
        ip_address: ipAddress,
        nickname,
        port,
        protocol,
      }),
    );
    close();
  };

  const renderHeader = (): ReactNode => <h2 className="EditBankModal__title">Edit Bank Nickname</h2>;

  return (
    <Modal
      className="EditBankModal"
      close={close}
      header={renderHeader()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
    >
      <FormInput label="Bank Nickname" name="nickname" />
    </Modal>
  );
};

export default EditBankModal;
