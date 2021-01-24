import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';
import {getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {setManagedAccount, setManagedFriend} from '@renderer/store/app';
import {AccountType, AppDispatch, ManagedAccount, ManagedFriend} from '@renderer/types';
import {getNicknameField} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';

interface ComponentProps {
  close(): void;
  managedAccountOrFriend: ManagedAccount | ManagedFriend;
  type: AccountType;
}

const EditAccountNicknameModal: FC<ComponentProps> = ({close, managedAccountOrFriend, type}) => {
  const dispatch = useDispatch<AppDispatch>();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);

  const managedAccountsOrFriends = type === AccountType.managedAccount ? managedAccounts : managedFriends;

  const initialValues = useMemo(() => {
    return {
      nickname: managedAccountOrFriend.nickname,
    };
  }, [managedAccountOrFriend]);

  type FormValues = typeof initialValues;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      nickname: getNicknameField(managedAccountsOrFriends, managedAccountOrFriend.nickname),
    });
  }, [managedAccountOrFriend.nickname, managedAccountsOrFriends]);

  const handleSubmit = ({nickname}: FormValues): void => {
    if (type === AccountType.managedAccount) {
      dispatch(
        setManagedAccount({
          ...(managedAccountOrFriend as ManagedAccount),
          nickname,
        }),
      );
    } else if (type === AccountType.managedFriend) {
      dispatch(
        setManagedFriend({
          ...(managedAccountOrFriend as ManagedFriend),
          nickname,
        }),
      );
    }
    close();
  };

  return (
    <Modal
      cancelButton="Cancel"
      close={close}
      header={`Edit ${type === AccountType.managedAccount ? 'Account' : 'Friend'} Nickname`}
      ignoreDirty
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
      validationSchema={validationSchema}
    >
      <FormInput
        focused
        label={`${type === AccountType.managedAccount ? 'Account' : 'Friend'} Nickname`}
        name="nickname"
      />
    </Modal>
  );
};

export default EditAccountNicknameModal;
