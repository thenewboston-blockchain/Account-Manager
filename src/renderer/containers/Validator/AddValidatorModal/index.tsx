import React, {FC, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Modal from '@renderer/components/Modal';
import {fetchValidatorConfig} from '@renderer/dispatchers/validators';
import {getManagedValidators} from '@renderer/selectors';
import {setManagedValidator} from '@renderer/store/app';
import {AppDispatch, ProtocolType} from '@renderer/types';
import {formatAddressFromNode, formatPathFromNode} from '@renderer/utils/address';
import {
  getAddressFormField,
  getIpAddressField,
  getNicknameField,
  getPortField,
  getProtocolField,
} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';

import AddValidatorModalFields from './AddValidatorModalFields';
import './AddValidatorModal.scss';

const initialValues = {
  form: '',
  ipAddress: '',
  nickname: '',
  port: '80',
  protocol: 'http' as ProtocolType,
};

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const AddValidatorModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const managedValidators = useSelector(getManagedValidators);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async ({ipAddress, nickname, port, protocol}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);

      const validatorAddressData = {
        ip_address: ipAddress,
        port: parseInt(port, 10),
        protocol,
      };

      const address = formatAddressFromNode(validatorAddressData);
      const validatorConfig = await dispatch(fetchValidatorConfig(address));

      if (validatorConfig.error) {
        if (validatorConfig.error.includes('timeout') || validatorConfig.error.includes('Network Error')) {
          displayErrorToast('Could Not Connect to Validator');
        } else {
          displayErrorToast('Invalid Validator Address');
        }
        setSubmitting(false);
        return;
      }

      const formattedData = {
        ...validatorAddressData,
        account_signing_key: '',
        nickname,
        nid_signing_key: '',
      };

      dispatch(setManagedValidator(formattedData));
      history.push(`/validator/${formatPathFromNode(formattedData)}/overview`);
      close();
    } catch (error) {
      displayToast('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      form: getAddressFormField(managedValidators, 'This address is already a managed validator'),
      ipAddress: getIpAddressField(),
      nickname: getNicknameField(managedValidators),
      port: getPortField(),
      protocol: getProtocolField(),
    });
  }, [managedValidators]);

  return (
    <Modal
      className="AddValidatorModal"
      close={close}
      header="Add Validator"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Add"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <AddValidatorModalFields />
    </Modal>
  );
};

export default AddValidatorModal;
