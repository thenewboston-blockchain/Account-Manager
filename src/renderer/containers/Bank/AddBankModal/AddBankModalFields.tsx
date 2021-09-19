import React, {FC} from 'react';
import {useFormContext} from '@renderer/hooks';
import {FormInput, FormSelect} from '@renderer/components/FormComponents';
import {InputOption} from '@renderer/types';

const protocolOptions: InputOption[] = [{value: 'http'}, {value: 'https'}];

const AddBankModalFields: FC = () => {
  const {errors} = useFormContext();
  const addressError = errors.form;

  return (
    <>
      {addressError ? <span className="AddBankModal__form-error">{addressError}</span> : null}
      <FormSelect focused label="Protocol" name="protocol" options={protocolOptions} required searchable={false} />
      <FormInput label="IP Address" name="ipAddress" required />
      <FormInput label="Port" name="port" type="number" />
      <FormInput label="Nickname" name="nickname" />
    </>
  );
};

export default AddBankModalFields;
