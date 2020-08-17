import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {FormInput, FormTextArea} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {createFriend} from '@renderer/store/old/friends';
import {AppDispatch} from '@renderer/types';
import yup from '@renderer/utils/yup';

import './AddFriendModal.scss';

const initialValues = {
  accountNumber: '',
  friendNickname: '',
};

const validationSchema = yup.object().shape({
  accountNumber: yup.string().required('This field is required'),
  friendNickname: yup.string().required('This field is required'),
});

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const AddFriendModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const handleSubmit = ({accountNumber, friendNickname}: FormValues): void => {
    dispatch(createFriend(friendNickname, accountNumber));
    history.push('/friend');
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
      <FormTextArea label="Account Number" name="accountNumber" required />
      <FormInput label="Friend Nickname" name="friendNickname" required />
    </Modal>
  );
};

export default AddFriendModal;
