import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {FormInput, FormSelectDetailed} from '@renderer/components/FormComponents';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {useFormContext} from '@renderer/hooks';
import {getActiveBankConfig, getActivePrimaryValidatorConfig, getManagedAccounts} from '@renderer/selectors';
import {InputOption} from '@renderer/types';

export const INVALID_AMOUNT_ERROR = 'Invalid amount';
export const MATCH_ERROR = 'Sender and recipient can not match';

const SendPointsModalFields: FC = () => {
  const {errors, touched, values} = useFormContext();
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const managedAccounts = useSelector(getManagedAccounts);
  const activePrimaryValidatorConfig = useSelector(getActivePrimaryValidatorConfig)!;

  const pointsError = touched.points ? errors.points : '';
  const matchError = errors.recipientAccountNumber === MATCH_ERROR;

  const managedAccountOptions = useMemo<InputOption[]>(
    () =>
      Object.values(managedAccounts).map(({account_number, nickname}) => ({
        label: nickname,
        value: account_number,
      })),
    [managedAccounts],
  );

  const renderSenderAccountBalance = (): string => {
    const {senderAccountNumber} = values;
    if (!senderAccountNumber) return '-';
    const {balance} = managedAccounts[senderAccountNumber];
    return balance?.toLocaleString() || '0.00';
  };

  const renderTotal = (): number | string => {
    const {points} = values;
    if (!points) return '-';
    const floatBalance = parseFloat(points);
    const floatBankTxFee = parseFloat(activeBankConfig.default_transaction_fee);
    const floatValidatorTxFee = parseFloat(activePrimaryValidatorConfig.default_transaction_fee);
    return floatBalance + floatBankTxFee + floatValidatorTxFee;
  };

  return (
    <>
      {matchError ? <span className="SendPointsModal__error">{MATCH_ERROR}</span> : null}
      {pointsError ? <span className="SendPointsModal__error">{pointsError}</span> : null}
      <FormSelectDetailed
        className="SendPointsModal__select"
        focused
        required
        label="From"
        options={managedAccountOptions}
        name="senderAccountNumber"
      />
      <FormSelectDetailed
        className="SendPointsModal__select"
        creatable
        hideErrorText={matchError}
        required
        label="To"
        options={managedAccountOptions}
        name="recipientAccountNumber"
      />
      <table className="SendPointsModal__table">
        <tbody>
          <tr>
            <td>Account Balance</td>
            <td>
              <span className="SendPointsModal__account-balance">{renderSenderAccountBalance()}</span>
            </td>
          </tr>
          <tr>
            <td>
              Points
              <RequiredAsterisk />
            </td>
            <td>
              <FormInput
                className="SendPointsModal__points-input"
                hideErrorBlock
                name="points"
                placeholder="0.00"
                type="number"
              />
            </td>
          </tr>
          <tr>
            <td>Bank Fee</td>
            <td>{activeBankConfig.default_transaction_fee}</td>
          </tr>
          <tr>
            <td>Validator Fee</td>
            <td>{activePrimaryValidatorConfig.default_transaction_fee}</td>
          </tr>
          <tr className="SendPointsModal__total-tr">
            <td>Total</td>
            <td>
              <b>{renderTotal()}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SendPointsModalFields;
