import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';
import {getManagedAccounts} from '@renderer/selectors';
import {setManagedAccount} from '@renderer/store/app';
import {AppDispatch, ManagedAccount} from '@renderer/types';
import yup from '@renderer/utils/yup';

interface ComponentProps {
  close(): void;
  managedAccount: ManagedAccount;
}

const EditAccountNicknameModal: FC<ComponentProps> = ({close, managedAccount}) => {
  const dispatch = useDispatch<AppDispatch>();
  const managedAccounts = useSelector(getManagedAccounts);

  const managedAccountNicknames = useMemo(
    () =>
      Object.values(managedAccounts)
        .filter(({nickname}) => !!nickname)
        .map(({nickname}) => nickname),
    [managedAccounts],
  );

  const initialValues = {
    nickname: managedAccount.nickname,
  };
  type FormValues = typeof initialValues;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      nickname: yup
        .string()
        .notOneOf(managedAccountNicknames, 'That nickname is already taken')
        .max(64, 'Nickname must not be more than 64 characters.'),
    });
  }, [managedAccountNicknames]);

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedAccount({
        ...managedAccount,
        nickname,
      }),
    );
    close();
  };

  return (
    <Modal
      cancelButton="Cancel"
      close={close}
      header="Edit Account Nickname"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
      validationSchema={validationSchema}
    >
      <FormInput focused label="Account Nickname" name="nickname" />
    </Modal>
  );
};

export default EditAccountNicknameModal;
