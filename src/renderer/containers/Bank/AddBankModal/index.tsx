import React, {FC, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Modal from '@renderer/components/Modal';
import {fetchBankConfig} from '@renderer/dispatchers/banks';
import {getManagedBanks} from '@renderer/selectors';
import {setManagedBank} from '@renderer/store/app';
import {AppDispatch, ProtocolType} from '@renderer/types';
import {formatAddressFromNode, formatPathFromNode} from '@renderer/utils/address';
import {
  getAddressFormField,
  getDomainAddressField,
  validateAddressField,
  getNicknameField,
  getPortField,
  getProtocolField,
} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';

import AddBankModalFields from './AddBankModalFields';
import './AddBankModal.scss';
import { isInsecureHttp } from '@renderer/utils/api'

const initialValues = {
  form: '',
  ipAddress: '',
  nickname: '',
  port: '',
  protocol: 'https' as ProtocolType,
};

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const AddBankModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const managedBanks = useSelector(getManagedBanks);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async ({ipAddress, nickname, port, protocol}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);

      const bankAddressData = {
        ip_address: ipAddress,
        port: isInsecureHttp(protocol) ? 80 : undefined,
        protocol,
      };

      console.log(bankAddressData)
      const address = formatAddressFromNode(bankAddressData);
      
      console.log('address',address)
      const bankConfig = await dispatch(fetchBankConfig(address));

      console.log('bankConfig', bankConfig)
      if (bankConfig.error) {
        if (bankConfig.error.includes('timeout') || bankConfig.error.includes('Network Error')) {
          displayErrorToast('Could Not Connect to Bank');
        } else {
          displayErrorToast('Invalid Bank Address');
        }
        setSubmitting(false);
        return;
      }

      const formattedData = {
        ...bankAddressData,
        account_signing_key: '',
        nickname,
        nid_signing_key: '',
      };

      dispatch(setManagedBank(formattedData));
      history.push(`/bank/${formatPathFromNode(formattedData)}/overview`);
      close();
    } catch (error) {
      displayToast('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      form: getAddressFormField(managedBanks, 'This address is already a managed bank'),
      ipAddress: validateAddressField(),
      nickname: getNicknameField(managedBanks),
      // port: isInsecureHttp
      // port: getPortField() === 80 ? '' : getPortField(),
      // port: undefined,
      protocol: getProtocolField(),
    });
  }, [managedBanks]);

  return (
    <Modal
      className="AddBankModal"
      close={close}
      header="Add Bank"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Add"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <AddBankModalFields />
    </Modal>
  );
};

export default AddBankModal;
