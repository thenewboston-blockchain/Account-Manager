import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {FormInput, FormSelectDetailed} from '@renderer/components/FormComponents';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {useFormContext} from '@renderer/hooks';
import {
  getActiveBankConfig,
  getActivePrimaryValidatorConfig,
  getBankConfigs,
  getManagedAccounts,
  getManagedBanks,
} from '@renderer/selectors';
import {BaseValidator, InputOption} from '@renderer/types';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';

import './PurchaseConfirmationServicesModalFields.scss';

interface ComponentProps {
  submitting: boolean;
  validator: BaseValidator;
}

const PurchaseConfirmationServicesModalFields: FC<ComponentProps> = ({submitting, validator}) => {
  const {errors, touched, values} = useFormContext();
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const activePrimaryValidatorConfig = useSelector(getActivePrimaryValidatorConfig)!;
  const bankConfigs = useSelector(getBankConfigs);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedBanks = useSelector(getManagedBanks);

  const amountError = touched.amount ? errors.amount : '';

  const getFromOptions = useMemo<InputOption[]>(
    () =>
      Object.entries(managedBanks).map(([key, managedBank]) => ({
        label: managedBank.nickname,
        value: key,
      })),
    [managedBanks],
  );

  const renderSenderAccountBalance = (): string => {
    const {bankAddress} = values;
    if (!bankAddress) return '-';
    const {
      data: {account_number: accountNumber},
    } = bankConfigs[bankAddress];
    const {balance} = managedAccounts[accountNumber];
    return balance?.toLocaleString() || '0';
  };

  const renderTotalDays = (): number | string => {
    const {daily_confirmation_rate: dailyRate} = validator;
    const {amount} = values;
    if (!amount || !dailyRate) return '-';
    const days = (amount / dailyRate).toFixed(2);
    return `${days} days`;
  };

  return (
    <>
      {amountError ? <span className="PurchaseConfirmationServicesModalFields__error">{amountError}</span> : null}
      <FormSelectDetailed
        disabled={submitting}
        focused
        label="From: Managed Bank"
        name="bankAddress"
        options={getFromOptions}
        required
      />
      <div className="PurchaseConfirmationServicesModalFields__label">To: Validator</div>
      <div className="PurchaseConfirmationServicesModalFields__validator-nid">
        <div>{validator.node_identifier.slice(0, 32)}</div>
        <div>{validator.node_identifier.slice(32)}</div>
      </div>
      <table className="PurchaseConfirmationServicesModalFields__table">
        <tbody>
          <tr>
            <td>Account Balance</td>
            <td>
              <span className="PurchaseConfirmationServicesModalFields__account-balance">
                {renderSenderAccountBalance()}
              </span>
            </td>
          </tr>
          <tr>
            <td>Active Bank Fee</td>
            <td>{getBankTxFee(activeBankConfig, values?.bankAddress) || '-'}</td>
          </tr>
          <tr>
            <td>Primary Validator Fee</td>
            <td>{getPrimaryValidatorTxFee(activePrimaryValidatorConfig, values?.bankAddress) || '-'}</td>
          </tr>
          <tr>
            <td>Daily Rate</td>
            <td>{validator.daily_confirmation_rate}</td>
          </tr>
          <tr>
            <td>
              Amount
              <RequiredAsterisk />
            </td>
            <td>
              <FormInput disabled={submitting} hideErrorBlock name="amount" placeholder="0" type="number" />
            </td>
          </tr>
          <tr className="PurchaseConfirmationServicesModalFields__time-tr">
            <td>Time</td>
            <td>
              <b>{renderTotalDays()}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PurchaseConfirmationServicesModalFields;
