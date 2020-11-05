import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {FormInput, FormTextArea} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {setManagedFriend} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import yup from '@renderer/utils/yup';

import './AddFriendModal.scss';

const initialValues = {
  accountNumber: '',
  nickname: '',
};

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const AddFriendModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);

  const managedAccountNumbers = useMemo(
    () =>
      Object.values(managedAccounts)
        .filter(({account_number}) => !!account_number)
        .map(({account_number}) => account_number),
    [managedAccounts],
  );

  const managedFriendsAccountNumbers = useMemo(
    () =>
      Object.values(managedFriends)
        .filter(({account_number}) => !!account_number)
        .map(({account_number}) => account_number),
    [managedFriends],
  );

  const managedFriendNicknames = useMemo(
    () =>
      Object.values(managedFriends)
        .filter(({nickname}) => !!nickname)
        .map(({nickname}) => nickname),
    [managedFriends],
  );

  const handleSubmit = ({accountNumber, nickname}: FormValues): void => {
    dispatch(
      setManagedFriend({
        account_number: accountNumber,
        nickname,
      }),
    );
    history.push(`/friend/${accountNumber}/overview`);
    close();
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      accountNumber: yup
        .string()
        .length(64, 'Account number must be 64 characters long')
        .required('This field is required')
        .test('cannot-add-own-account', 'Unable to add your own account as a friend', (accountNumber) => {
          return !managedAccountNumbers.includes(accountNumber || '');
        })
        .test('friend-already-exists', "This friend's account already exists", (accountNumber) => {
          return !managedFriendsAccountNumbers.includes(accountNumber || '');
        }),
      nickname: yup.string().notOneOf(managedFriendNicknames, 'That nickname is already taken'),
    });
  }, [managedAccountNumbers, managedFriendsAccountNumbers, managedFriendNicknames]);

  return (
    <Modal
      className="AddFriendModal"
      close={close}
      header="Add Friend"
      ignoreDirty={false}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Add"
      validationSchema={validationSchema}
    >
      <FormInput focused label="Nickname" name="nickname" />
      <FormTextArea label="Account Number" name="accountNumber" required />
    </Modal>
  );
};

export default AddFriendModal;
