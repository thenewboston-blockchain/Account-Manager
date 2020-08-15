/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */

import React, {FC, ReactNode, useMemo} from 'react';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import axios from 'axios';

import {FormButton} from '@renderer/components/FormComponents';
import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {getActiveBankConfig, getActivePrimaryValidatorConfig, getManagedAccounts} from '@renderer/selectors';
import {Tx} from '@renderer/types';
import {generateBlock, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';

import SendPointsModalFields, {INVALID_AMOUNT_ERROR, MATCH_ERROR} from './SendPointsModalFields';
import './SendPointsModal.scss';

const initialValues = {
  points: '0.00',
  recipientAccountNumber: '',
  senderAccountNumber: '',
};

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const SendPointsModal: FC<ComponentProps> = ({close}) => {
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const activePrimaryValidatorConfig = useSelector(getActivePrimaryValidatorConfig)!;
  const managedAccounts = useSelector(getManagedAccounts);

  const createBlock = async (txs: Tx[]): Promise<void> => {
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

  const handleSubmit = async ({points, recipientAccountNumber, senderAccountNumber}: FormValues): Promise<void> => {
    console.log(senderAccountNumber, points, recipientAccountNumber);
    const txs: Tx[] = [
      {
        amount: points,
        recipient: recipientAccountNumber,
      },
      {
        amount: activeBankConfig.default_transaction_fee,
        recipient: activeBankConfig.account_number,
      },
      {
        amount: activePrimaryValidatorConfig.default_transaction_fee,
        recipient: activePrimaryValidatorConfig.account_number,
      },
    ];
    await createBlock(txs);
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

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      points: Yup.number()
        .moreThan(0, 'Must be greater than 0')
        .required('This field is required')
        .test('invalid-amount', INVALID_AMOUNT_ERROR, function (value) {
          if (!this.parent.senderAccountNumber) return true;
          const {balance} = managedAccounts[this.parent.senderAccountNumber];
          return value < balance;
        }),
      recipientAccountNumber: Yup.string()
        .required('This field is required')
        .test('accounts-match', MATCH_ERROR, function (value) {
          return value !== this.parent.senderAccountNumber;
        }),
      senderAccountNumber: Yup.string()
        .required('This field is required')
        .test('accounts-match', MATCH_ERROR, function (value) {
          return value !== this.parent.recipientAccountNumber;
        }),
    });
  }, [managedAccounts]);

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
