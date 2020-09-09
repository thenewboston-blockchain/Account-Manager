import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {FormInput, FormSelectDetailed} from '@renderer/components/FormComponents';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {useFormContext} from '@renderer/hooks';
import {
  getActiveBankConfig,
  getActivePrimaryValidatorConfig,
  getManagedAccounts,
  getManagedFriends,
} from '@renderer/selectors';
import {InputOption} from '@renderer/types';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';

import './SendPointsModalFields.scss';

export const INVALID_AMOUNT_ERROR = 'Invalid amount';
export const MATCH_ERROR = 'Sender and recipient can not match';

interface ComponentProps {
  submitting: boolean;
}

const SendPointsModalFields: FC<ComponentProps> = ({submitting}) => {
  const {errors, touched, values} = useFormContext();
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const activePrimaryValidatorConfig = useSelector(getActivePrimaryValidatorConfig)!;
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);

  const pointsError = touched.points ? errors.points : '';
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
    const {balance} = managedAccounts[senderAccountNumber];
    return balance?.toLocaleString() || '0';
  };

  const renderTotal = (): number | string => {
    const {points, senderAccountNumber} = values;
    if (!points) return '-';
    const bankTxFee = getBankTxFee(activeBankConfig, senderAccountNumber);
    const validatorTxFee = getPrimaryValidatorTxFee(activePrimaryValidatorConfig, senderAccountNumber);
    return points + bankTxFee + validatorTxFee;
  };

  return (
    <>
      {matchError ? <span className="SendPointsModalFields__error">{MATCH_ERROR}</span> : null}
      {pointsError ? <span className="SendPointsModalFields__error">{pointsError}</span> : null}
      <FormSelectDetailed
        className="SendPointsModalFields__select"
        disabled={submitting}
        focused
        label="From"
        name="senderAccountNumber"
        options={getFromOptions}
        required
      />
      <FormSelectDetailed
        className="SendPointsModalFields__select"
        creatable
        disabled={submitting}
        hideErrorText={matchError}
        label="To"
        name="recipientAccountNumber"
        options={getToOptions}
        required
      />
      <table className="SendPointsModalFields__table">
        <tbody>
          <tr>
            <td>Account Balance</td>
            <td>
              <span className="SendPointsModalFields__account-balance">{renderSenderAccountBalance()}</span>
            </td>
          </tr>
          <tr>
            <td>
              Points
              <RequiredAsterisk />
            </td>
            <td>
              <FormInput disabled={submitting} hideErrorBlock name="points" placeholder="0" type="number" />
            </td>
          </tr>
          <tr>
            <td>Bank Fee</td>
            <td>{getBankTxFee(activeBankConfig, values?.senderAccountNumber) || '-'}</td>
          </tr>
          <tr>
            <td>Validator Fee</td>
            <td>{getPrimaryValidatorTxFee(activePrimaryValidatorConfig, values?.senderAccountNumber) || '-'}</td>
          </tr>
          <tr className="SendPointsModalFields__total-tr">
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
