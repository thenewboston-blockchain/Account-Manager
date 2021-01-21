import React, {FC, useMemo, useState} from 'react';
import axios from 'axios';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {useNavigationalHistory} from '@renderer/hooks';
import {ManagedNode} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import yup from '@renderer/utils/forms/yup';
import {generateSignature, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {displayToast} from '@renderer/utils/toast';

interface ComponentProps {
  close(): void;
  requestingNode: ManagedNode;
  targetIdentifier: string;
  targetType: 'accounts' | 'banks' | 'validators';
  trust: string;
}

const EditTrustModal: FC<ComponentProps> = ({close, requestingNode, targetIdentifier, trust, targetType}) => {
  const {reload} = useNavigationalHistory();
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
      const {publicKeyHex, signingKey} = getKeyPairFromSigningKeyHex(requestingNode.nid_signing_key);
      const requestData = {
        message: values,
        node_identifier: publicKeyHex,
        signature: generateSignature(JSON.stringify(values), signingKey),
      };
      const address = `${formatAddressFromNode(requestingNode)}/${targetType}/${targetIdentifier}`;
      await axios.patch(address, requestData);
      reload();
    } catch (error) {
      displayToast('An error occurred');
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
      <FormInput focused label="Trust" name="trust" required type="number" />
    </Modal>
  );
};

export default EditTrustModal;
