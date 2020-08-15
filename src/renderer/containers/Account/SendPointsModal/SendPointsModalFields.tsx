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
  const matchError = errors.senderAccountNumber === MATCH_ERROR || errors.recipientAccountNumber === MATCH_ERROR;

  const getRecipientOptions = () => {
    const {senderAccountNumber} = values;
    return Object.values(managedAccounts)
      .filter(({account_number}) => account_number !== senderAccountNumber)
      .map(({account_number, nickname}) => ({
        label: nickname,
        value: account_number,
      }));
  };

  const getSenderOptions = () => {
    const {recipientAccountNumber} = values;
    return Object.values(managedAccounts)
      .filter(({account_number}) => account_number !== recipientAccountNumber)
      .map(({account_number, nickname}) => ({
        label: nickname,
        value: account_number,
      }));
  };

  const renderSenderAccountBalance = (): string => {
    const {senderAccountNumber} = values;
    if (!senderAccountNumber) return '-';
    const {balance} = managedAccounts[senderAccountNumber];
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
        options={getSenderOptions()}
        name="senderAccountNumber"
      />
      <FormSelectDetailed
        className="SendPointsModal__select"
        hideError={matchError}
        required
        label="To"
        options={getRecipientOptions()}
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
                hideError
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
