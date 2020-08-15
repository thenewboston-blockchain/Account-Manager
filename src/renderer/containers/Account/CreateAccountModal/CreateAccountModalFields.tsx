import React, {FC} from 'react';
import {FormInput, FormRadioGroup, FormTextArea} from '@renderer/components/FormComponents';
import {useFormContext} from '@renderer/hooks';

const CreateAccountModalFields: FC = () => {
  const {values} = useFormContext();
  const renderSigningKey = values.type === 'add';

  return (
    <>
      <FormRadioGroup
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
