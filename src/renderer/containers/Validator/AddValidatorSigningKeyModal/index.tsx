import React, {FC, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {FormTextArea} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {SIGNING_KEY_LENGTH_ERROR, SIGNING_KEY_REQUIRED_ERROR} from '@renderer/constants/form-validation';
import {useAddress} from '@renderer/hooks';
import {getManagedValidators, getValidatorConfigs} from '@renderer/selectors';
import {setManagedValidator} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import yup from '@renderer/utils/yup';

interface ComponentProps {
  close(): void;
}

const initialValues = {
  signingKey: '',
};

type FormValues = typeof initialValues;

const AddValidatorSigningKeyModal: FC<ComponentProps> = ({close}) => {
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const validatorConfigs = useSelector(getValidatorConfigs);
  const {
    data: {node_identifier: nodeIdentifier},
  } = validatorConfigs[address];
  const managedValidators = useSelector(getManagedValidators);
  const managedValidator = managedValidators[address];

  const handleSubmit = ({signingKey}: FormValues): void => {
    dispatch(
      setManagedValidator({
        ...managedValidator,
        signing_key: signingKey,
      }),
    );
    close();
  };

  const managedValidatorSigningKeys = useMemo(
    () =>
      Object.values(managedValidators)
        .filter(({signing_key}) => !!signing_key)
        .map(({signing_key}) => signing_key),
    [managedValidators],
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      signingKey: yup
        .string()
        .length(64, SIGNING_KEY_LENGTH_ERROR)
        .notOneOf(managedValidatorSigningKeys, 'That validator already exists')
        .required(SIGNING_KEY_REQUIRED_ERROR)
        .test({
          message: 'Resulting public key does not match NID',
          name: 'is-valid-private-key',
          test: (value: string) => {
            try {
              const {publicKeyHex} = getKeyPairFromSigningKeyHex(value);
              return publicKeyHex === nodeIdentifier;
            } catch (error) {
              return false;
            }
          },
        }),
    });
  }, [managedValidatorSigningKeys, nodeIdentifier]);

  return (
    <Modal
      close={close}
      header="Add NID Signing Key"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
      validationSchema={validationSchema}
    >
      <FormTextArea label="Signing Key" name="signingKey" required />
    </Modal>
  );
};

export default AddValidatorSigningKeyModal;
