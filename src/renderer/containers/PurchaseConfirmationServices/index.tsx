import React, {FC, ReactNode, useMemo, useReducer, useState} from 'react';
import {useSelector} from 'react-redux';

import {Button, Select} from '@renderer/components/FormElements';
import {useAddress, useBooleanState} from '@renderer/hooks';
import {getAuthenticatedBanks} from '@renderer/selectors';
import {Dict, InputOption} from '@renderer/types';

import BulkPurchaseConfirmationServicesModal from './BulkPurchaseConfirmationServicesModal';
import PurchaseConfirmationServicesTable from './PurchaseConfirmationServicesTable';
import {clearSelectedValidator, selectedValidatorReducer} from './utils';
import './PurchaseConfirmationServices.scss';

const PurchaseConfirmationServices: FC = () => {
  const initialAddress = useAddress();
  const authenticatedBanks = useSelector(getAuthenticatedBanks);
  const initialBankIsAuthenticated = !!authenticatedBanks[initialAddress];

  const bankOptionsObject = useMemo<Dict<InputOption>>(() => {
    return Object.entries(authenticatedBanks).reduce((acc, [bankAddress, bank]) => {
      const label = `${bank.nickname ? `${bank.nickname} - ` : ''}${bankAddress}`;

      return {
        ...acc,
        [bankAddress]: {
          label,
          value: bankAddress,
        },
      };
    }, {});
  }, [authenticatedBanks]);

  const bankOptionsList = useMemo<InputOption[]>(() => {
    return Object.values(bankOptionsObject);
  }, [bankOptionsObject]);

  const [purchaseModalIsOpen, togglePurchaseModal] = useBooleanState(false);
  const [selectedBank, setSelectedBank] = useState<InputOption | null>(
    initialBankIsAuthenticated ? bankOptionsObject[initialAddress] : bankOptionsList[0] || null,
  );
  const [selectedValidators, dispatchSelectedValidators] = useReducer(selectedValidatorReducer, {});

  const selectedCount = useMemo<number>(() => {
    return Object.keys(selectedValidators).length;
  }, [selectedValidators]);

  const handleBankChange = (option: InputOption): void => {
    if (!selectedBank) return;

    if (option.value !== selectedBank.value) {
      dispatchSelectedValidators(clearSelectedValidator());
      setSelectedBank(option);
    }
  };

  const handlePurchaseClick = (): void => {
    if (!selectedCount) return;

    togglePurchaseModal();
  };

  const renderMainContent = (): ReactNode => {
    if (!selectedBank) {
      return (
        <div className="PurchaseConfirmationServices__no-authenticated-banks">
          You don't have any authenticated banks
        </div>
      );
    }

    return (
      <>
        <div className="bank-select">
          <label className="bank-select__label" htmlFor="bank-select">
            Bank:
          </label>
          <Select
            className="bank-select__input"
            name="bank-select"
            onChange={handleBankChange}
            options={bankOptionsList}
            value={selectedBank}
          />
        </div>
        <PurchaseConfirmationServicesTable
          address={selectedBank.value}
          className="PurchaseConfirmationServices__table"
          dispatchSelectedValidators={dispatchSelectedValidators}
          selectedValidators={selectedValidators}
        />
      </>
    );
  };

  return (
    <>
      <div className="PurchaseConfirmationServices">
        <div className="header">
          <h1 className="header__title">Purchase Confirmation Services</h1>
          <Button className="header__purchase-button" disabled={!selectedCount} onClick={handlePurchaseClick}>
            Purchase ({selectedCount})
          </Button>
        </div>
        {renderMainContent()}
      </div>
      {purchaseModalIsOpen && (
        <BulkPurchaseConfirmationServicesModal close={togglePurchaseModal} selectedValidators={selectedValidators} />
      )}
    </>
  );
};

export default PurchaseConfirmationServices;
