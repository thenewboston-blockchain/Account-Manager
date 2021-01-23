import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {setManagedBank} from '@renderer/store/app';
import {getManagedBanks} from '@renderer/selectors';
import {AppDispatch, ManagedNode} from '@renderer/types';
import {getNicknameField} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';

interface ComponentProps {
  bank: ManagedNode;
  close(): void;
}

const EditBankNicknameModal: FC<ComponentProps> = ({bank, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues = {
    nickname: bank.nickname,
  };

  type FormValues = typeof initialValues;

  const managedBanks = useSelector(getManagedBanks);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      nickname: getNicknameField(managedBanks, bank.nickname),
    });
  }, [bank.nickname, managedBanks]);

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedBank({
        ...bank,
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
      ignoreDirty
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
      validationSchema={validationSchema}
    >
      <FormInput focused label="Bank Nickname" name="nickname" />
    </Modal>
  );
};

export default EditBankNicknameModal;
