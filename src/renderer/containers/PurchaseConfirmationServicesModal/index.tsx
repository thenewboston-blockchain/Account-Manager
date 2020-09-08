import React, {FC, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {FormInput, FormSelectDetailed} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import {getManagedBanks} from '@renderer/selectors';
import {BaseValidator, InputOption} from '@renderer/types';

import './PurchaseConfirmationServicesModal.scss';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';

interface ComponentProps {
  close(): void;
  validator: BaseValidator;
}

const PurchaseConfirmationServicesModal: FC<ComponentProps> = ({close}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const managedBanks = useSelector(getManagedBanks);

  const getFromOptions = useMemo<InputOption[]>(
    () =>
      Object.values(managedBanks).map(({ip_address, nickname}) => ({
        label: nickname,
        value: ip_address,
      })),
    [managedBanks],
  );

  return (
    <Modal
      className="PurchaseConfirmationServicesModal"
      close={close}
      header="Purchase Confirmation Services"
      initialValues={{}}
      onSubmit={() => {}}
      submitButton="Purchase"
      submitting={submitting}
      validationSchema={{}}
    >
      <FormSelectDetailed
        className="PurchaseConfirmationServicesModal__select"
        disabled={submitting}
        focused
        required
        label="From: Managed Bank"
        options={getFromOptions}
        name="managedBank"
      />
      <table className="PurchaseConfirmationServicesModal__table">
        <tbody>
          <tr>
            <td>Account Balance</td>
            <td>
              <span className="PurchaseConfirmationServicesModal__account-balance">{`${(1350).toLocaleString()}`}</span>
            </td>
          </tr>
          <tr>
            <td>Bank Fee</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Validator Fee</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Daily Rate</td>
            <td>4</td>
          </tr>
          <tr>
            <td>
              Amount
              <RequiredAsterisk />
            </td>
            <td>
              <FormInput
                className="PurchaseConfirmationServicesModal__points-input"
                disabled={submitting}
                hideErrorBlock
                name="points"
                placeholder="0.00"
                type="number"
              />
            </td>
          </tr>
          <tr className="PurchaseConfirmationServicesModal__time-tr">
            <td>Time</td>
            <td>
              <b>5.26 days</b>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default PurchaseConfirmationServicesModal;
