import React, {FC, useMemo, useState} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {ManagedNode} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import {generateSignature, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import yup from '@renderer/utils/yup';

interface ComponentProps {
  close(): void;
  node: ManagedNode;
  nodeIdentifier: string;
  trust: string;
  type: 'accounts' | 'banks' | 'validators';
}

const EditTrustModal: FC<ComponentProps> = ({close, node, nodeIdentifier, trust, type}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const initialValues = useMemo(() => ({trust}), [trust]);
  type FormValues = typeof initialValues;
  const validationSchema = yup.object().shape({
    trust: yup
      .number()
      .required('This field is required')
      .min(0, 'Must be a positive amount')
      .max(100, 'Must be less than 100'),
  });

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      const {accountNumberHex, signingKey} = getKeyPairFromSigningKeyHex(node.signing_key);
      const requestData = {
        message: values,
        node_identifier: accountNumberHex,
        signature: generateSignature(JSON.stringify(values), signingKey),
      };
      const address = `${formatAddressFromNode(node)}/${type}/${nodeIdentifier}`;
      await axios.patch(address, requestData);
      location.reload();
    } catch (error) {
      toast.error('An error occurred');
      setSubmitting(false);
    }
  };

  return (
    <Modal
      className="EditTrustModal"
      close={close}
      header="Edit Trust"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <FormInput label="Trust" name="trust" required type="number" />
    </Modal>
  );
};

export default EditTrustModal;
