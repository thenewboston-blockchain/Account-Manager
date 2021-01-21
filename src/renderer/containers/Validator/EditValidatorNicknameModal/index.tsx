import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {getManagedValidators} from '@renderer/selectors';
import {setManagedValidator} from '@renderer/store/app';
import {AppDispatch, ManagedNode} from '@renderer/types';
import {getNicknameField} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';

interface ComponentProps {
  close(): void;
  validator: ManagedNode;
}

const EditValidatorNicknameModal: FC<ComponentProps> = ({close, validator}) => {
  const dispatch = useDispatch<AppDispatch>();
  const managedValidators = useSelector(getManagedValidators);

  const initialValues = useMemo(
    () => ({
      nickname: validator.nickname,
    }),
    [validator],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedValidator({
        ...validator,
        nickname,
      }),
    );
    close();
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      nickname: getNicknameField(managedValidators, validator.nickname),
    });
  }, [managedValidators, validator.nickname]);

  return (
    <Modal
      className="EditValidatorNicknameModal"
      close={close}
      header="Edit Validator Nickname"
      ignoreDirty
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
      validationSchema={validationSchema}
    >
      <FormInput focused label="Validator Nickname" name="nickname" />
    </Modal>
  );
};

export default EditValidatorNicknameModal;
