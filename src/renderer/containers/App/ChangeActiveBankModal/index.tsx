import React, {FC, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';

import {connectAndStoreLocalData} from '@renderer/dispatchers/app';
import {FormInput, FormSelect} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {AppDispatch, InputOption, ProtocolType} from '@renderer/types';
import {formatPathFromNode} from '@renderer/utils/address';
import yup from '@renderer/utils/yup';

const initialValues = {
  ipAddress: '',
  nickname: '',
  port: '',
  protocol: 'http' as ProtocolType,
};

type FormValues = typeof initialValues;

const protocolOptions: InputOption[] = [{value: 'http'}, {value: 'https'}];

const genericIpAddressRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/;

const validationSchema = yup.object().shape({
  ipAddress: yup
    .string()
    .required('This field is required')
    .matches(genericIpAddressRegex, {excludeEmptyString: true, message: 'IPv4 or IPv6 addresses only'}),
  nickname: yup.string(),
  port: yup.number().integer(),
  protocol: yup.string().required(),
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
      const bankNetworkData = {
        ip_address: ipAddress,
        port: port ? parseInt(port, 10) : null,
        protocol,
      };
      const response = await dispatch(connectAndStoreLocalData(bankNetworkData, nickname));
      if (response?.error) {
        toast.error(response.error);
        setSubmitting(false);
        return;
      }
      if (response?.bankConfig) {
        history.push(`/bank/${formatPathFromNode(response.bankConfig)}/overview`);
      }
      close();
    } catch (error) {
      toast.error('An error occurred');
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
      <FormSelect label="Protocol" name="protocol" options={protocolOptions} required searchable={false} />
      <FormInput label="IP Address" name="ipAddress" required />
      <FormInput label="Port" name="port" type="number" />
      <FormInput label="Nickname" name="nickname" />
    </Modal>
  );
};

export default ChangeActiveBankModal;
