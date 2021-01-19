import React, {FC, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {connectAndStoreLocalData} from '@renderer/dispatchers/app';
import {FormInput, FormSelect} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {IP_INVALID_FORMAT_ERROR, REQUIRED_FIELD_ERROR} from '@renderer/constants/form-validation';
import {AppDispatch, InputOption, ProtocolType} from '@renderer/types';
import {formatPathFromNode} from '@renderer/utils/address';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import yup from '@renderer/utils/yup';

const initialValues = {
  ipAddress: '',
  nickname: '',
  port: '80',
  protocol: 'http' as ProtocolType,
};

type FormValues = typeof initialValues;

const protocolOptions: InputOption[] = [{value: 'http'}, {value: 'https'}];

const genericIpAddressRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/;

const validationSchema = yup.object().shape({
  ipAddress: yup
    .string()
    .required(REQUIRED_FIELD_ERROR)
    .matches(genericIpAddressRegex, {excludeEmptyString: true, message: IP_INVALID_FORMAT_ERROR}),
  nickname: yup.string(),
  port: yup.number().integer().required(REQUIRED_FIELD_ERROR),
  protocol: yup.string().required(REQUIRED_FIELD_ERROR),
});

interface ComponentProps {
  close(): void;
}

const ChangeActiveBankModal: FC<ComponentProps> = ({close}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const handleSubmit = async ({ipAddress, nickname, port, protocol}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      const bankAddressData = {
        ip_address: ipAddress,
        port: parseInt(port, 10),
        protocol,
      };
      const response = await dispatch(connectAndStoreLocalData(bankAddressData, nickname));
      if (response?.error) {
        displayErrorToast(response.error);
        setSubmitting(false);
        return;
      }
      if (response?.bankConfig) {
        history.push(`/bank/${formatPathFromNode(response.bankConfig)}/overview`);
      }
      close();
    } catch (error) {
      displayToast('An error occurred');
      setSubmitting(false);
    }
  };

  return (
    <Modal
      className="ChangeActiveBankModal"
      close={close}
      header="Change Active Bank"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Connect"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <FormSelect focused label="Protocol" name="protocol" options={protocolOptions} required searchable={false} />
      <FormInput label="IP Address" name="ipAddress" required />
      <FormInput label="Port" name="port" type="number" required />
      <FormInput label="Nickname" name="nickname" />
    </Modal>
  );
};

export default ChangeActiveBankModal;
