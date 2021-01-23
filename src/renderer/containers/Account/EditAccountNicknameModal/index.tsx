import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';
import {getManagedAccounts} from '@renderer/selectors';
import {setManagedAccount} from '@renderer/store/app';
import {AppDispatch, ManagedAccount} from '@renderer/types';
import {getNicknameField} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';

interface ComponentProps {
  close(): void;
  managedAccount: ManagedAccount;
}

const EditAccountNicknameModal: FC<ComponentProps> = ({close, managedAccount}) => {
  const dispatch = useDispatch<AppDispatch>();
  const managedAccounts = useSelector(getManagedAccounts);

  const initialValues = {
    nickname: managedAccount.nickname,
  };
  type FormValues = typeof initialValues;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      nickname: getNicknameField(managedAccounts, managedAccount.nickname),
    });
  }, [managedAccount.nickname, managedAccounts]);

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
      ignoreDirty
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
