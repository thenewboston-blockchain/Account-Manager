import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {getManagedFriends} from '@renderer/selectors';
import {FormInput} from '@renderer/components/FormComponents';
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

  const initialValues = {
    nickname: managedFriend.nickname,
  };
  type FormValues = typeof initialValues;

  const managedFriendNicknames = useMemo(
    () =>
      Object.values(managedFriends)
        .filter(({nickname}) => initialValues.nickname !== nickname)
        .map(({nickname}) => nickname),
    [managedFriends, initialValues],
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
    console.log(managedFriendNicknames);
    return yup.object().shape({
      nickname: yup.string().notOneOf(managedFriendNicknames, 'That nickname is already taken'),
    });
  }, [managedFriendNicknames]);

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
