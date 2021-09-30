import React, {FC} from 'react';
import {useFormContext} from '@renderer/hooks';
import {FormInput, FormSelect} from '@renderer/components/FormComponents';
import {InputOption, Protocol} from '@renderer/types';

const protocolOptions: InputOption[] = [{value: Protocol.HTTP}, {value: Protocol.HTTPS}];

const AddValidatorModalFields: FC = () => {
  const {errors} = useFormContext();
  const addressError = errors.form;

  return (
    <>
      {addressError ? <span className="AddValidatorModal__form-error">{addressError}</span> : null}
      <FormSelect focused label="Protocol" name="protocol" options={protocolOptions} required searchable={false} />
      <FormInput label="IP Address" name="ipAddress" required />
      <FormInput label="Port" name="port" type="number" />
      <FormInput label="Nickname" name="nickname" />
    </>
  );
};

export default AddValidatorModalFields;
