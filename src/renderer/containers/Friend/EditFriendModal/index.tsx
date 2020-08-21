import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';
import {setManagedFriend} from '@renderer/store/app';
import {AppDispatch, ManagedFriend} from '@renderer/types';

interface ComponentProps {
  friend: ManagedFriend;
  close(): void;
}

const EditFriendModal: FC<ComponentProps> = ({friend, close}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    nickname: friend.nickname,
  };
  type FormValues = typeof initialValues;

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedFriend({
        account_number: friend.account_number,
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
