import React, {FC} from 'react';
import {useSelector} from 'react-redux';

import {FormInput, FormSelectDetailed} from '@renderer/components/FormComponents';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {useFormContext} from '@renderer/hooks';
import {getActiveBankConfig, getActivePrimaryValidatorConfig} from '@renderer/selectors';
import {Dict, ManagedAccount} from '@renderer/types';

export const INVALID_AMOUNT_ERROR = 'Invalid amount';
export const MATCH_ERROR = 'Sender and recipient can not match';

interface ComponentProps {
  managedAccounts: Dict<ManagedAccount>;
}

const SendPointsModalFields: FC<ComponentProps> = ({managedAccounts}) => {
  const {errors, values} = useFormContext();
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const activePrimaryValidatorConfig = useSelector(getActivePrimaryValidatorConfig)!;
  const invalidAmountError = errors.points === INVALID_AMOUNT_ERROR;
  const matchError = errors.fromAccountNumber === MATCH_ERROR || errors.toAccountNumber === MATCH_ERROR;

  const getFromOptions = () => {
    const {toAccountNumber} = values;
    return Object.values(managedAccounts)
      .filter(({account_number}) => account_number !== toAccountNumber)
      .map(({account_number, nickname}) => ({
        label: nickname,
        value: account_number,
      }));
  };

  const getToOptions = () => {
    const {fromAccountNumber} = values;
    return Object.values(managedAccounts)
      .filter(({account_number}) => account_number !== fromAccountNumber)
      .map(({account_number, nickname}) => ({
        label: nickname,
        value: account_number,
      }));
  };

  const renderFromAccountBalance = (): string => {
    const {fromAccountNumber} = values;
    if (!fromAccountNumber) return '-';
    const {balance} = managedAccounts[fromAccountNumber];
    return balance || '0.00';
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
      {invalidAmountError ? <span>{INVALID_AMOUNT_ERROR}</span> : null}
      {matchError ? <span>{MATCH_ERROR}</span> : null}
      <FormSelectDetailed
        className="SendPointsModal__select"
        hideError={matchError}
        required
        label="From"
        options={getFromOptions()}
        name="fromAccountNumber"
      />
      <FormSelectDetailed
        className="SendPointsModal__select"
        hideError={matchError}
        required
        label="To"
        options={getToOptions()}
        name="toAccountNumber"
      />
      <table className="SendPointsModal__table">
        <tbody>
          <tr>
            <td>Account Balance</td>
            <td>
              <span className="SendPointsModal__account-balance">{renderFromAccountBalance()}</span>
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
                hideError
                name="points"
                placeholder="0.00"
                type="number"
              />
            </td>
          </tr>
          <tr>
            <td>Bank Registration Fee</td>
            <td>{activeBankConfig.default_transaction_fee}</td>
          </tr>
          <tr>
            <td>Validator Tx Fee</td>
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
