/* eslint-disable func-names */

import React, {FC, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import axios from 'axios';

import {FormButton} from '@renderer/components/FormComponents';
import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {getManagedAccounts} from '@renderer/selectors';
import {Tx} from '@renderer/types';
import {generateBlock, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';

import SendPointsModalFields, {MATCH_ERROR} from './SendPointsModalFields';
import './SendPointsModal.scss';

const initialValues = {
  fromAccount: '',
  points: '0.00',
  toAccount: '',
};

const validationSchema = Yup.object().shape({
  fromAccount: Yup.string()
    .required('This field is required')
    .test('accounts-match', MATCH_ERROR, function (value) {
      return value !== this.parent.toAccount;
    }),
  points: Yup.number().moreThan(0, 'Must be greater than 0').required('This field is required'),
  toAccount: Yup.string()
    .required('This field is required')
    .test('accounts-match', MATCH_ERROR, function (value) {
      return value !== this.parent.fromAccount;
    }),
});

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const txs: Tx[] = [
  {
    amount: 5.5,
    recipient: '484b3176c63d5f37d808404af1a12c4b9649cd6f6769f35bdf5a816133623fbc',
  },
  {
    amount: 1,
    recipient: '5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8',
  },
  {
    amount: 4,
    recipient: 'ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
  },
];

const SendPointsModal: FC<ComponentProps> = ({close}) => {
  const managedAccounts = useSelector(getManagedAccounts);

  const createBlock = async (): Promise<void> => {
    const signingKeyHex = '4e5804d995d5ab84afb85154d7645c73c8fedb80723a262787c2428e59051b58';
    const {accountNumberHex, signingKey} = getKeyPairFromSigningKeyHex(signingKeyHex);
    const balanceLock = 'c88d1b0d55f430b66ad603993b76d7e9bd147b7209e13b2bb548fb680905dc8d';
    const block = generateBlock(accountNumberHex, balanceLock, signingKey, txs);
    const response = await axios.post('http://167.99.173.247/blocks', block, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.error(response);
  };

  const handleSubmit = ({points}: FormValues): void => {
    console.log(points);
  };

  const renderFooter = (): ReactNode => {
    return (
      <>
        <FormButton className="Modal__default-cancel SendPointsModal__default-cancel" onClick={close} variant="link">
          Cancel
        </FormButton>
        <FormButton className="Modal__default-submit SendPointsModal__default-submit" type="submit">
          Send <Icon className="SendPointsModal__submit-icon" icon={IconType.tnb} size={16} />
        </FormButton>
      </>
    );
  };

  return (
    <Modal
      className="SendPointsModal"
      close={close}
      footer={renderFooter()}
      header="Send Points"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <SendPointsModalFields managedAccounts={managedAccounts} />
    </Modal>
  );
};

export default SendPointsModal;
