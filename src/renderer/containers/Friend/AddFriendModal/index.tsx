import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {FormInput, FormTextArea} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {setManagedFriend} from '@renderer/store/app/managedFriends';
import {AppDispatch} from '@renderer/types';
import yup from '@renderer/utils/yup';

import './AddFriendModal.scss';

const initialValues = {
  friendNickname: '',
  friendNumber: '',
};

const validationSchema = yup.object().shape({
  friendNickname: yup.string(),
  friendNumber: yup.string().length(4, 'Signing key must be 64 characters long').required('This field is required'),
});

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const AddFriendModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const handleSubmit = ({friendNumber, friendNickname}: FormValues): void => {
    dispatch(
      setManagedFriend({
        friend_number: friendNumber,
        nickname: friendNickname,
      }),
    );
    history.push(`/friend/${friendNumber}/overview`);
    close();
  };

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
      <FormInput label="Nickname" name="friendNickname" />
      <FormTextArea label="Friend Number" name="friendNumber" required />
    </Modal>
  );
};

export default AddFriendModal;
