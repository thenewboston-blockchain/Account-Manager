import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {setManagedBank} from '@renderer/store/app';
import {getManagedBanks} from '@renderer/selectors';
import {AppDispatch, ManagedNode} from '@renderer/types';
import yup from '@renderer/utils/yup';

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

  const managedBankNicknames = useMemo(
    () =>
      Object.values(managedBanks)
        .filter(({nickname}) => !!nickname)
        .map(({nickname}) => nickname),
    [managedBanks],
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      nickname: yup
        .string()
        .notOneOf(managedBankNicknames, 'That nickname is already taken')
        .max(64, 'Nickname must not be more than 64 characters.'),
    });
  }, [managedBankNicknames]);

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
