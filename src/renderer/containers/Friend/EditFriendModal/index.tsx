import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';
import {getManagedFriends} from '@renderer/selectors';
import {setManagedFriend} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';

type FormValues = typeof initialValue;

const initialValue = {
  accountNumber: '',
  nickname: '',
};

interface ComponentProps {
  accountNumber: string;
  friendNickName: string;
  close(): void;
}

const EditFriendModal: FC<ComponentProps> = ({accountNumber, friendNickName, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const managedFriends = useSelector(getManagedFriends);

  const initialValues = {
    accountNumber: '',
    nickname: friendNickName,
  };

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedFriend({
        account_number: accountNumber,
        nickname,
      }),
    );
    close();
  };

  return (
    <Modal
      cancelButton="Cancel"
      close={close}
      header="Edit Friend"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
    >
      <FormInput label="Nickname" name="nickname" />
    </Modal>
  );
};

export default EditFriendModal;
