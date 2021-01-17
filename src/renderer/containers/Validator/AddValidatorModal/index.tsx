import React, {FC, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Modal from '@renderer/components/Modal';
import {
  IP_INVALID_FORMAT_ERROR,
  NICKNAME_EXISTS_ERROR,
  NICKNAME_MAX_LENGTH,
  NICKNAME_MAX_LENGTH_ERROR,
  REQUIRED_FIELD_ERROR,
  VALIDATOR_ADDRESS_EXISTS_ERROR,
} from '@renderer/constants/form-validation';
import {fetchValidatorConfig} from '@renderer/dispatchers/validators';
import {getManagedValidators} from '@renderer/selectors';
import {setManagedValidator} from '@renderer/store/app';
import {AppDispatch, ProtocolType} from '@renderer/types';
import {formatAddress, formatAddressFromNode, formatPathFromNode} from '@renderer/utils/address';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import yup from '@renderer/utils/yup';

import AddValidatorModalFields from './AddValidatorModalFields';
import './AddValidatorModal.scss';

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

const AddValidatorModal: FC<ComponentProps> = ({close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const managedValidators = useSelector(getManagedValidators);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const managedValidatorAddresses = useMemo(
    () => Object.values(managedValidators).map((validator) => formatAddressFromNode(validator)),
    [managedValidators],
  );

  const managedValidatorNicknames = useMemo(
    () =>
      Object.values(managedValidators)
        .filter(({nickname}) => !!nickname)
        .map(({nickname}) => nickname),
    [managedValidators],
  );

  const handleSubmit = async ({ipAddress, nickname, port, protocol}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);

      const validatorAddressData = {
        ip_address: ipAddress,
        port: port ? parseInt(port, 10) : null,
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
      form: yup.string().when(['ipAddress', 'port', 'protocol'], {
        is: (ipAddress, port, protocol) => managedValidatorAddresses.includes(formatAddress(ipAddress, port, protocol)),
        otherwise: yup.string(),
        then: yup.string().required(VALIDATOR_ADDRESS_EXISTS_ERROR),
      }),
      ipAddress: yup
        .string()
        .required(REQUIRED_FIELD_ERROR)
        .matches(genericIpAddressRegex, {excludeEmptyString: true, message: IP_INVALID_FORMAT_ERROR}),
      nickname: yup
        .string()
        .notOneOf(managedValidatorNicknames, NICKNAME_EXISTS_ERROR)
        .max(NICKNAME_MAX_LENGTH, NICKNAME_MAX_LENGTH_ERROR),
      port: yup.number().integer(),
      protocol: yup.string().required(),
    });
  }, [managedValidatorAddresses, managedValidatorNicknames]);

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
