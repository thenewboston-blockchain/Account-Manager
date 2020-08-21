import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';
import {useAddress} from '@renderer/hooks';
import {getManagedBanks} from '@renderer/selectors';
import {setManagedBank} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';

interface ComponentProps {
  close(): void;
}

const initialValues = {
  nickname: '',
};

type FormValues = typeof initialValues;

const EditBankNicknameModal: FC<ComponentProps> = ({close}) => {
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const managedBanks = useSelector(getManagedBanks);
  const managedBank = managedBanks[address];

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedBank({
        ...managedBank,
        nickname,
      }),
    );
    close();
  };

  return (
    <Modal
      className="EditBankNicknameModal"
      close={close}
      header="Edit Bank Nickname"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
    >
      <FormInput label="Bank Nickname" name="nickname" />
    </Modal>
  );
};

export default EditBankNicknameModal;
