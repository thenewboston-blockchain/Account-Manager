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
  const {values} = useFormContext();
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const activePrimaryValidatorConfig = useSelector(getActivePrimaryValidatorConfig)!;
  const bankConfigs = useSelector(getBankConfigs);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedBanks = useSelector(getManagedBanks);

  const getBanksAccountNumberFromAddress = (bankAddress: string) => {
    const {
      data: {account_number: accountNumber},
    } = bankConfigs[bankAddress];
    return accountNumber;
  };

  const getFromOptions = useMemo<InputOption[]>(
    () =>
      Object.entries(managedBanks).map(([key, managedBank]) => ({
        label: managedBank.nickname,
        value: key,
      })),
    [managedBanks],
  );

  const renderActiveBankFee = () => {
    if (!values?.bankAddress) return activeBankConfig.default_transaction_fee;
    return getBankTxFee(activeBankConfig, getBanksAccountNumberFromAddress(values.bankAddress)) || '-';
  };

  const renderBanksAccountBalance = (): string => {
    const {bankAddress} = values;
    if (!bankAddress) return '-';
    const accountNumber = getBanksAccountNumberFromAddress(bankAddress);
    const {balance} = managedAccounts[accountNumber];
    return balance?.toLocaleString() || '0';
  };

  const renderDays = (): number | string => {
    const {daily_confirmation_rate: dailyRate} = validator;
    const {amount} = values;
    if (!amount || !dailyRate) return '-';
    const days = (amount / dailyRate).toFixed(2);
    return `${days} days`;
  };

  const renderTotal = (): number | string => {
    const {amount, bankAddress} = values;
    if (!amount || !bankAddress) return '-';
    const accountNumber = getBanksAccountNumberFromAddress(bankAddress);
    const bankTxFee = getBankTxFee(activeBankConfig, accountNumber);
    const validatorTxFee = getPrimaryValidatorTxFee(activePrimaryValidatorConfig, accountNumber);
    return amount + bankTxFee + validatorTxFee;
  };

  return (
    <>
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
                {renderBanksAccountBalance()}
              </span>
            </td>
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
          <tr>
            <td>Daily Rate</td>
            <td>{validator.daily_confirmation_rate}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>
              <b>{renderDays()}</b>
            </td>
          </tr>
          <tr className="PurchaseConfirmationServicesModalFields__bank-fee-tr">
            <td>Active Bank Fee</td>
            <td>{renderActiveBankFee()}</td>
          </tr>
          <tr>
            <td>Primary Validator Fee</td>
            <td>{getPrimaryValidatorTxFee(activePrimaryValidatorConfig, values?.bankAddress) || '-'}</td>
          </tr>
          <tr>
            <td>Total Tx Cost</td>
            <td>
              <b>{renderTotal()}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PurchaseConfirmationServicesModalFields;
