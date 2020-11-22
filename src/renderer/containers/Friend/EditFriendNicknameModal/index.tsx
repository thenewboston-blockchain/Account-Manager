import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {FormInput} from '@renderer/components/FormComponents';
import {NICKNAME_MAX_LENGTH, NICKNAME_MAX_LENGTH_ERROR} from '@renderer/constants/form-validation';
import {getManagedFriends} from '@renderer/selectors';
import {setManagedFriend} from '@renderer/store/app';
import {AppDispatch, ManagedFriend} from '@renderer/types';
import yup from '@renderer/utils/yup';

interface ComponentProps {
  close(): void;
  managedFriend: ManagedFriend;
}

const EditFriendNicknameModal: FC<ComponentProps> = ({close, managedFriend}) => {
  const dispatch = useDispatch<AppDispatch>();
  const managedFriends = useSelector(getManagedFriends);

  const initialValues = useMemo(
    () => ({
      nickname: managedFriend.nickname,
    }),
    [managedFriend],
  );

  type FormValues = typeof initialValues;

  const managedFriendsNicknames = useMemo(
    () =>
      Object.values(managedFriends)
        .filter(({nickname}) => initialValues.nickname !== nickname)
        .map(({nickname}) => nickname),
    [initialValues, managedFriends],
  );

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedFriend({
        account_number: managedFriend.account_number,
        nickname,
      }),
    );
    close();
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      nickname: yup
        .string()
        .notOneOf(managedFriendsNicknames, 'That nickname is already taken')
        .max(NICKNAME_MAX_LENGTH, NICKNAME_MAX_LENGTH_ERROR),
    });
  }, [managedFriendsNicknames]);

  return (
    <Modal
      cancelButton="Cancel"
      close={close}
      header="Edit Friend Nickname"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
      validationSchema={validationSchema}
    >
      <FormInput focused label="Friend Nickname" name="nickname" />
    </Modal>
  );
};

export default EditFriendNicknameModal;
