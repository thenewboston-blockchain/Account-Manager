import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {FormInput, FormSelectDetailed} from '@renderer/components/FormComponents';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {useFormContext} from '@renderer/hooks';
import {getActiveBankConfig, getActivePrimaryValidatorConfig, getManagedBanks} from '@renderer/selectors';
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
    <>
      <FormSelectDetailed
        disabled={submitting}
        focused
        label="From: Managed Bank"
        name="managedBank"
        options={getFromOptions}
        required
      />
      <table className="PurchaseConfirmationServicesModalFields__table">
        <tbody>
          <tr>
            <td>Account Balance</td>
            <td>
              <span className="PurchaseConfirmationServicesModalFields__account-balance">{`${(1350).toLocaleString()}`}</span>
            </td>
          </tr>
          <tr>
            <td>Bank Fee</td>
            <td>{getBankTxFee(activeBankConfig, values?.bankAccountNumber) || '-'}</td>
          </tr>
          <tr>
            <td>Validator Fee</td>
            <td>{getPrimaryValidatorTxFee(activePrimaryValidatorConfig, values?.bankAccountNumber) || '-'}</td>
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
              <FormInput disabled={submitting} hideErrorBlock name="points" placeholder="0" type="number" />
            </td>
          </tr>
          <tr className="PurchaseConfirmationServicesModalFields__time-tr">
            <td>Time</td>
            <td>
              <b>5.26 days</b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PurchaseConfirmationServicesModalFields;
