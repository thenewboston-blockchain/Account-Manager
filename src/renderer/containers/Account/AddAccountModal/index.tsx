import React, {FC} from 'react';
import * as Yup from 'yup';
import {sign} from 'tweetnacl';
import {encodeBase64, encodeUTF8} from 'tweetnacl-util';

import {FormInput} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import useBooleanState from '@renderer/hooks/useBooleanState';

const initialValues = {
  nickname: '',
};

type FormValues = typeof initialValues;

// TODO: Make it unique if inputted
const validationSchema = Yup.object().shape({
  nickname: Yup.string(),
});

interface ComponentProps {
  close(): void;
}

const AddAccountModal: FC<ComponentProps> = ({close}) => {
  const [submitting, , setSubmittingTrue, setSubmittingFalse] = useBooleanState(false);

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const {publicKey, secretKey} = sign.keyPair();
    console.log('PUBLIC KEY', Buffer.from(publicKey).toString('hex'));
    console.log('PRIVATE KEY', Buffer.from(secretKey).toString('hex'));
  };

  return (
    <Modal
      close={close}
      header="Create Account"
      ignoreDirty
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Create"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <FormInput label="Account Nickname" name="nickname" />
    </Modal>
  );
};

export default AddAccountModal;
