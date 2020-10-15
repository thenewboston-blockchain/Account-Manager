import React, {FC, ReactNode, useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {FormButton} from '@renderer/components/FormComponents';
import Icon, {IconType} from '@renderer/components/Icon2';
import Modal from '@renderer/components/Modal';
import {getActiveBankConfig, getActivePrimaryValidatorConfig, getManagedAccounts} from '@renderer/selectors';
import {sendBlock} from '@renderer/utils/blocks';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';
import yup from '@renderer/utils/yup';

import SendPointsModalFields, {FormValues, INVALID_AMOUNT_ERROR, MATCH_ERROR} from './SendPointsModalFields';
import './SendPointsModal.scss';

interface ComponentProps {
  close(): void;
  initialRecipient: string;
  initialSender: string;
}

const SendPointsModal: FC<ComponentProps> = ({close, initialRecipient, initialSender}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const activeBank = useSelector(getActiveBankConfig)!;
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig)!;
  const managedAccounts = useSelector(getManagedAccounts);

  const checkPointsWithBalance = useCallback(
    (points: number, accountNumber: string): boolean => {
      if (!accountNumber || !points) return true;
      const {balance} = managedAccounts[accountNumber];
      const totalCost =
        getBankTxFee(activeBank, accountNumber) +
        getPrimaryValidatorTxFee(activePrimaryValidator, accountNumber) +
        points;
      return totalCost <= balance;
    },
    [activeBank, activePrimaryValidator, managedAccounts],
  );

  const initialValues = useMemo(
    () => ({
      points: '',
      recipientAccountNumber: initialRecipient,
      senderAccountNumber: initialSender,
    }),
    [initialRecipient, initialSender],
  );

  const handleSubmit = async ({points, recipientAccountNumber, senderAccountNumber}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      const pointAmount = parseInt(points, 10);
      await sendBlock(
        activeBank,
        activePrimaryValidator,
        managedAccounts,
        pointAmount,
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
          className="Modal__default-cancel SendPointsModal__default-cancel"
          onClick={close}
          submitting={submitting}
          variant="link"
        >
          Cancel
        </FormButton>
        <FormButton
          className="Modal__default-submit SendPointsModal__default-submit"
          submitting={submitting}
          type="submit"
        >
          Send <Icon className="SendPointsModal__submit-icon" icon={IconType.tnb} size={16} totalSize={16} />
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
        .integer('Points cannot be a decimal')
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
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <SendPointsModalFields submitting={submitting} />
    </Modal>
  );
};

export default SendPointsModal;
