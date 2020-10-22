import React, {FC, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Modal from '@renderer/components/Modal';
import {fetchBankConfig} from '@renderer/dispatchers/banks';
import {getManagedBanks} from '@renderer/selectors';
import {setManagedBank} from '@renderer/store/app';
import {AppDispatch, ProtocolType} from '@renderer/types';
import {formatAddress, formatAddressFromNode, formatPathFromNode} from '@renderer/utils/address';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import yup from '@renderer/utils/yup';

import AddBankModalFields from './AddBankModalFields';
import './AddBankModal.scss';

const initialValues = {
  form: '',
  ipAddress: '',
  nickname: '',
  port: '',
  protocol: 'http' as ProtocolType,
};

type FormValues = typeof initialValues;

const genericIpAddressRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/;

interface ComponentProps {
  close(): void;
}

const AddBankModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const managedBanks = useSelector(getManagedBanks);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const managedBankAddresses = useMemo(() => Object.values(managedBanks).map((bank) => formatAddressFromNode(bank)), [
    managedBanks,
  ]);

  const managedBankNicknames = useMemo(
    () =>
      Object.values(managedBanks)
        .filter(({nickname}) => !!nickname)
        .map(({nickname}) => nickname),
    [managedBanks],
  );

  const handleSubmit = async ({ipAddress, nickname, port, protocol}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);

      const bankAddressData = {
        ip_address: ipAddress,
        port: port ? parseInt(port, 10) : null,
        protocol,
      };

      const address = formatAddressFromNode(bankAddressData);
      const bankConfig = await dispatch(fetchBankConfig(address));

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
      form: yup.string().when(['ipAddress', 'port', 'protocol'], {
        is: (ipAddress, port, protocol) => managedBankAddresses.includes(formatAddress(ipAddress, port, protocol)),
        otherwise: yup.string(),
        then: yup.string().required('This address is already a managed bank'),
      }),
      ipAddress: yup
        .string()
        .required('This field is required')
        .matches(genericIpAddressRegex, {excludeEmptyString: true, message: 'IPv4 or IPv6 addresses only'}),
      nickname: yup.string().notOneOf(managedBankNicknames, 'That nickname is already taken'),
      port: yup.number().integer(),
      protocol: yup.string().required(),
    });
  }, [managedBankAddresses, managedBankNicknames]);

  return (
    <Modal
      className="AddBankModal"
      close={close}
      header="Add Bank"
      ignoreDirty
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
