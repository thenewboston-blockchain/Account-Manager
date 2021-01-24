import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {FormInput, FormTextArea} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {
  ACCOUNT_NUMBER_LENGTH,
  ACCOUNT_NUMBER_LENGTH_ERROR,
  FRIEND_AS_OWN_ACCOUNT_ERROR,
  FRIEND_EXISTS_ERROR,
  REQUIRED_FIELD_ERROR,
} from '@renderer/constants/form-validation';
import {getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {setManagedFriend} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {getNicknameField} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';

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

  const handleSubmit = ({accountNumber, nickname}: FormValues): void => {
    dispatch(
      setManagedFriend({
        account_number: accountNumber,
        nickname,
      }),
    );
    history.push(`/account/${accountNumber}/overview`);
    close();
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      accountNumber: yup
        .string()
        .length(ACCOUNT_NUMBER_LENGTH, ACCOUNT_NUMBER_LENGTH_ERROR)
        .required(REQUIRED_FIELD_ERROR)
        .test('cannot-add-own-account', FRIEND_AS_OWN_ACCOUNT_ERROR, (accountNumber) => {
          return !managedAccountNumbers.includes(accountNumber || '');
        })
        .test('friend-already-exists', FRIEND_EXISTS_ERROR, (accountNumber) => {
          return !managedFriendsAccountNumbers.includes(accountNumber || '');
        }),
      nickname: getNicknameField(managedFriends),
    });
  }, [managedAccountNumbers, managedFriends, managedFriendsAccountNumbers]);

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
