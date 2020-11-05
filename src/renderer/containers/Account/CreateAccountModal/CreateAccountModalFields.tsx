import React, {FC, useEffect} from 'react';
import {FormInput, FormRadioGroup, FormTextArea} from '@renderer/components/FormComponents';
import {useFormContext} from '@renderer/hooks';

export const initialValues = {
  nickname: '',
  signingKey: '',
  type: 'create',
};

export type FormValues = typeof initialValues;

interface ComponentProps {
  setIsCreatingNewAccount(val: boolean): void;
}

const CreateAccountModalFields: FC<ComponentProps> = ({setIsCreatingNewAccount}) => {
  const {
    values: {type},
  } = useFormContext<FormValues>();
  const renderSigningKey = type === 'add';

  useEffect(() => {
    if (type === 'add') {
      setIsCreatingNewAccount(false);
    } else {
      setIsCreatingNewAccount(true);
    }
  }, [setIsCreatingNewAccount, type]);

  return (
    <>
      <FormRadioGroup
        focused
        options={[
          {label: 'Create New Account', value: 'create'},
          {label: 'Add Existing Account', value: 'add'},
        ]}
        name="type"
      />
      <FormInput label="Nickname" name="nickname" />
      {renderSigningKey && <FormTextArea label="Signing Key" name="signingKey" required />}
    </>
  );
};

export default CreateAccountModalFields;
