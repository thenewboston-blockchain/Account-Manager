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
  accountNumber: '',
  nickname: '',
};

const validationSchema = yup.object().shape({
  accountNumber: yup.string().length(64, 'Friend Number must be 64 characters long').required('This field is required'),
  nickname: yup.string(),
});

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const AddFriendModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

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
      <FormTextArea label="Friend Number" name="accountNumber" required />
    </Modal>
  );
};

export default AddFriendModal;
