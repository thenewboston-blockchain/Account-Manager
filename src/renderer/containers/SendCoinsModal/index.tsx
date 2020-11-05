import React, {FC, ReactNode, useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {FormButton} from '@renderer/components/FormComponents';
import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {getActiveBankConfig, getActivePrimaryValidatorConfig, getManagedAccounts} from '@renderer/selectors';
import {sendBlock} from '@renderer/utils/blocks';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';
import yup from '@renderer/utils/yup';

import SendCoinsModalFields, {FormValues, INVALID_AMOUNT_ERROR, MATCH_ERROR} from './SendCoinsModalFields';
import './SendCoinsModal.scss';

interface ComponentProps {
  close(): void;
  initialRecipient: string;
  initialSender: string;
}

const SendCoinsModal: FC<ComponentProps> = ({close, initialRecipient, initialSender}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const activeBank = useSelector(getActiveBankConfig)!;
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig)!;
  const managedAccounts = useSelector(getManagedAccounts);

  const checkCoinsWithBalance = useCallback(
    (coins: number, accountNumber: string): boolean => {
      if (!accountNumber || !coins) return true;
      const {balance} = managedAccounts[accountNumber];
      const totalCost =
        getBankTxFee(activeBank, accountNumber) +
        getPrimaryValidatorTxFee(activePrimaryValidator, accountNumber) +
        coins;
      return totalCost <= balance;
    },
    [activeBank, activePrimaryValidator, managedAccounts],
  );

  const initialValues = useMemo(
    () => ({
      coins: '',
      recipientAccountNumber: initialRecipient,
      senderAccountNumber: initialSender,
    }),
    [initialRecipient, initialSender],
  );

  const handleSubmit = async ({coins, recipientAccountNumber, senderAccountNumber}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      const coinAmount = parseInt(coins, 10);
      await sendBlock(
        activeBank,
        activePrimaryValidator,
        coinAmount,
        managedAccounts,
        recipientAccountNumber,
        senderAccountNumber,
      );
      displayToast('Your payment has been sent', 'success');
      close();
    } catch (error) {
      displayErrorToast(error);
      setSubmitting(false);
    }
  };

  const renderFooter = (): ReactNode => {
    return (
      <>
        <FormButton
          className="Modal__default-cancel SendCoinsModal__default-cancel"
          onClick={close}
          submitting={submitting}
          variant="link"
        >
          Cancel
        </FormButton>
        <FormButton
          className="Modal__default-submit SendCoinsModal__default-submit"
          submitting={submitting}
          type="submit"
        >
          Send <Icon className="SendCoinsModal__submit-icon" icon={IconType.tnb} size={16} totalSize={16} />
        </FormButton>
      </>
    );
  };

  const validationSchema = useMemo(() => {
    const senderAccountNumberRef = yup.ref('senderAccountNumber');
    return yup.object().shape({
      coins: yup
        .number()
        .callbackWithRef(senderAccountNumberRef, checkCoinsWithBalance, INVALID_AMOUNT_ERROR)
        .moreThan(0, 'Coins must be greater than 0')
        .integer('Coins cannot be a decimal')
        .required('Coins is a required field'),
      recipientAccountNumber: yup
        .string()
        .notEqualTo(senderAccountNumberRef, MATCH_ERROR)
        .length(64, 'Account Number must be 64 characters long')
        .required('This field is required'),
      senderAccountNumber: yup.string().required('This field is required'),
    });
  }, [checkCoinsWithBalance]);

  return (
    <Modal
      className="SendCoinsModal"
      close={close}
      footer={renderFooter()}
      header="Send Coins"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <SendCoinsModalFields submitting={submitting} />
    </Modal>
  );
};

export default SendCoinsModal;
