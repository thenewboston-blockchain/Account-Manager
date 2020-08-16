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
import {formatAddress} from '@renderer/utils/address';
import {generateBlock, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {calculateTotalCost} from '@renderer/utils/transactions';

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
  const activeBank = useSelector(getActiveBankConfig)!;
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig)!;
  const managedAccounts = useSelector(getManagedAccounts);

  const createBlock = async (recipientAccountNumber: string, senderAccountNumber: string, txs: Tx[]): Promise<void> => {
    const {signing_key: signingKeyHex} = managedAccounts[senderAccountNumber];
    const {accountNumberHex, signingKey} = getKeyPairFromSigningKeyHex(signingKeyHex);
    const balanceLock = await fetchAccountBalanceLock(senderAccountNumber);

    const {ip_address: ipAddress, port, protocol} = activeBank;
    const address = formatAddress(ipAddress, port, protocol);
    const block = generateBlock(accountNumberHex, balanceLock, signingKey, txs);
    await axios.post(`${address}/blocks`, block, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const fetchAccountBalanceLock = async (accountNumber: string): Promise<string> => {
    const {ip_address: ipAddress, port, protocol} = activePrimaryValidator;
    const address = formatAddress(ipAddress, port, protocol);
    const {
      data: {balance_lock: balanceLock},
    } = await axios.get(`${address}/account_balance_lock/${accountNumber}`);
    return balanceLock;
  };

  const handleSubmit = async ({points, recipientAccountNumber, senderAccountNumber}: FormValues): Promise<void> => {
    const txs: Tx[] = [
      {
        amount: points,
        recipient: recipientAccountNumber,
      },
      {
        amount: activeBank.default_transaction_fee,
        recipient: activeBank.account_number,
      },
      {
        amount: activePrimaryValidator.default_transaction_fee,
        recipient: activePrimaryValidator.account_number,
      },
    ];

    try {
      await createBlock(recipientAccountNumber, senderAccountNumber, txs);
      close();
    } catch (error) {
      console.log(error);
    }
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
          const totalCost = calculateTotalCost({
            bankTxFee: activeBank.default_transaction_fee,
            points: value,
            validatorTxFee: activePrimaryValidator.default_transaction_fee,
          });
          return totalCost <= parseFloat(balance);
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
  }, [activeBank, activePrimaryValidator, managedAccounts]);

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
