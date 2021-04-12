import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {FormInput, FormSelectDetailed} from '@renderer/components/FormComponents';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {MATCH_ERROR} from '@renderer/constants/form-validation';
import {useFormContext} from '@renderer/hooks';
import {
  getActiveBankConfig,
  getPrimaryValidatorConfig,
  getManagedAccountBalances,
  getManagedAccounts,
  getManagedFriends,
} from '@renderer/selectors';
import {InputOption} from '@renderer/types';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';

import './SendCoinsModalFields.scss';

export interface FormValues {
  coins: string;
  memo?: string;
  recipientAccountNumber: string;
  senderAccountNumber: string;
}

interface ComponentProps {
  submitting: boolean;
}

const SendCoinsModalFields: FC<ComponentProps> = ({submitting}) => {
  const {errors, touched, values} = useFormContext<FormValues>();
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const managedAccountBalances = useSelector(getManagedAccountBalances);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);
  const primaryValidatorConfig = useSelector(getPrimaryValidatorConfig);

  const coinsError = touched.coins ? errors.coins : '';
  const matchError = errors.recipientAccountNumber === MATCH_ERROR;

  const getFromOptions = useMemo<InputOption[]>(
    () =>
      Object.values(managedAccounts).map(({account_number, nickname}) => ({
        label: nickname,
        value: account_number,
      })),
    [managedAccounts],
  );

  const getToOptions = useMemo<InputOption[]>(() => {
    const accounts = [...Object.values(managedAccounts), ...Object.values(managedFriends)];
    return accounts.map(({account_number, nickname}) => ({
      label: nickname,
      value: account_number,
    }));
  }, [managedAccounts, managedFriends]);

  const renderSenderAccountBalance = (): string => {
    const {senderAccountNumber} = values;
    if (!senderAccountNumber) return '-';
    const {balance} = managedAccountBalances[senderAccountNumber];
    return balance?.toLocaleString() || '0';
  };

  const renderTotal = (): string => {
    const {coins, senderAccountNumber} = values;
    if (!primaryValidatorConfig || !coins) return '-';
    const bankTxFee = getBankTxFee(activeBankConfig, senderAccountNumber);
    const validatorTxFee = getPrimaryValidatorTxFee(primaryValidatorConfig, senderAccountNumber);
    return (parseInt(coins, 10) + bankTxFee + validatorTxFee).toLocaleString();
  };

  const renderValidatorFee = (): number | string => {
    if (!primaryValidatorConfig) return '-';
    return getPrimaryValidatorTxFee(primaryValidatorConfig, values?.senderAccountNumber) || '-';
  };

  return (
    <>
      {matchError ? <span className="SendCoinsModalFields__error">{MATCH_ERROR}</span> : null}
      {coinsError ? <span className="SendCoinsModalFields__error">{coinsError}</span> : null}
      <FormSelectDetailed
        className="SendCoinsModalFields__select"
        disabled={submitting}
        focused
        label="From"
        name="senderAccountNumber"
        options={getFromOptions}
        required
      />
      <FormSelectDetailed
        className="SendCoinsModalFields__select"
        creatable
        disabled={submitting}
        hideErrorText={matchError}
        label="To"
        name="recipientAccountNumber"
        options={getToOptions}
        required
      />
      <FormInput disabled={submitting} label="Memo" name="memo" placeholder="What is it for?" />
      <table className="SendCoinsModalFields__table">
        <tbody>
          <tr>
            <td>Account Balance</td>
            <td>
              <span className="SendCoinsModalFields__account-balance">{renderSenderAccountBalance()}</span>
            </td>
          </tr>
          <tr>
            <td>
              Coins
              <RequiredAsterisk />
            </td>
            <td>
              <FormInput disabled={submitting} hideErrorBlock name="coins" placeholder="0" type="number" />
            </td>
          </tr>
          <tr>
            <td>Bank Fee</td>
            <td>{getBankTxFee(activeBankConfig, values?.senderAccountNumber) || '-'}</td>
          </tr>
          <tr>
            <td>Validator Fee</td>
            <td>{renderValidatorFee()}</td>
          </tr>
          <tr className="SendCoinsModalFields__total-tr">
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

export default SendCoinsModalFields;
