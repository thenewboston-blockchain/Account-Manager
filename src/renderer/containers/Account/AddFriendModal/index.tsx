import React, {FC} from 'react';
import Modal from '@renderer/components/Modal';
import {FormInput, FormTextArea} from '@renderer/components/FormComponents';
import {createFriend} from '@renderer/store/friends';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import './AddFriendModal.scss';

const initialValues = {
  accountNumber: '',
  friendNickname: '',
};

const validationSchema = Yup.object().shape({
  accountNumber: Yup.string().required('This field is required'),
  friendNickname: Yup.string().required('This field is required'),
});

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const AddFriendModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = ({accountNumber, friendNickname}: FormValues): void => {
    dispatch(createFriend(friendNickname, accountNumber));
    history.push('/account');
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
      <FormTextArea label="Account Number" name="accountNumber" />
      <FormInput label="Friend Nickname" name="friendNickname" />
    </Modal>
  );
};

export default AddFriendModal;
