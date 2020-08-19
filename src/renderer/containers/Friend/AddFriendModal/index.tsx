import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {FormInput, FormTextArea} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {getManagedFriends} from '@renderer/selectors';
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
  const managedFriends = useSelector(getManagedFriends);

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
        .required('This field is required'),
      nickname: yup.string().notOneOf(managedFriendNicknames, 'That nickname is already taken'),
    });
  }, [managedFriendNicknames]);

  return (
    <Modal
      className="AddFriendModal"
      close={close}
      header="Add Friend"
      ignoreDirty
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Create"
      validationSchema={validationSchema}
    >
      <FormInput label="Nickname" name="nickname" />
      <FormTextArea label="Account Number" name="accountNumber" required />
    </Modal>
  );
};

export default AddFriendModal;
