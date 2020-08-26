import React, {FC, ReactNode, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {toast} from 'react-toastify';

import {FormButton} from '@renderer/components/FormComponents';
import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {getActiveBankConfig, getActivePrimaryValidatorConfig, getManagedAccounts} from '@renderer/selectors';
import {Tx} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';
import {generateBlock, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {calculateTotalCost} from '@renderer/utils/transactions';
import yup from '@renderer/utils/yup';

import SendPointsModalFields, {INVALID_AMOUNT_ERROR, MATCH_ERROR} from './SendPointsModalFields';
import './SendPointsModal.scss';

interface ComponentProps {
  close(): void;
  initialRecipient: string;
  initialSender: string;
}

const SendPointsModal: FC<ComponentProps> = ({close, initialRecipient, initialSender}) => {
  const activeBank = useSelector(getActiveBankConfig)!;
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig)!;
  const managedAccounts = useSelector(getManagedAccounts);

  const checkPointsWithBalance = useCallback(
    (points: number, accountNumber: string): boolean => {
      if (!accountNumber || !points) return true;
      const {balance} = managedAccounts[accountNumber];
      const totalCost = calculateTotalCost(
        activeBank.default_transaction_fee,
        points,
        activePrimaryValidator.default_transaction_fee,
      );
      return totalCost <= parseFloat(balance);
    },
    [activeBank.default_transaction_fee, activePrimaryValidator.default_transaction_fee, managedAccounts],
  );

  const initialValues = useMemo(
    () => ({
      points: '',
      recipientAccountNumber: initialRecipient,
      senderAccountNumber: initialSender,
    }),
    [initialRecipient, initialSender],
  );

  type FormValues = typeof initialValues;

  const createBlock = async (recipientAccountNumber: string, senderAccountNumber: string, txs: Tx[]): Promise<void> => {
    const {signing_key: signingKeyHex} = managedAccounts[senderAccountNumber];
    const {publicKeyHex, signingKey} = getKeyPairFromSigningKeyHex(signingKeyHex);
    const balanceLock = await fetchAccountBalanceLock(senderAccountNumber);

    const {ip_address: ipAddress, port, protocol} = activeBank;
    const address = formatAddress(ipAddress, port, protocol);
    const block = generateBlock(balanceLock, publicKeyHex, signingKey, txs);
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
    } = await axios.get(`${address}/accounts/${accountNumber}/balance_lock`);
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
      toast.error(error);
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
    const senderAccountNumberRef = yup.ref('senderAccountNumber');

    return yup.object().shape({
      points: yup
        .number()
        .callbackWithRef(senderAccountNumberRef, checkPointsWithBalance, INVALID_AMOUNT_ERROR)
        .moreThan(0, 'Points must be greater than 0')
        .required('Points is a required field'),
      recipientAccountNumber: yup
        .string()
        .notEqualTo(senderAccountNumberRef, MATCH_ERROR)
        .length(64, 'Account Number must be 64 characters long')
        .required('This field is required'),
      senderAccountNumber: yup.string().required('This field is required'),
    });
  }, [checkPointsWithBalance]);

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
      <SendPointsModalFields />
    </Modal>
  );
};

export default SendPointsModal;
