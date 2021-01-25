import React, {FC, ReactNode, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {Button, Select} from '@renderer/components/FormElements';
import {useAddress} from '@renderer/hooks';
import {getAuthenticatedBanks} from '@renderer/selectors';
import {Dict, InputOption} from '@renderer/types';

import './PurchaseConfirmationService.scss';

const PurchaseConfirmationService: FC = () => {
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

  const [selectedBank, setSelectedBank] = useState<InputOption | null>(
    initialBankIsAuthenticated ? bankOptionsObject[initialAddress] : bankOptionsList[0] || null,
  );

  const handleBankChange = (option: InputOption | null): void => {
    setSelectedBank(option);
  };

  const renderMainContent = (): ReactNode => {
    if (!selectedBank) {
      return (
        <div className="PurchaseConfirmationService__no-authenticated-banks">
          You don't have any authenticated banks
        </div>
      );
    }

    return (
      <div className="main">
        <div className="main__top">
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
        </div>
      </div>
    );
  };

  return (
    <div className="PurchaseConfirmationService">
      <div className="header">
        <h1 className="header__title">Purchase Confirmation Services</h1>
        <Button className="header__purchase-button">Purchase</Button>
      </div>
      {renderMainContent()}
    </div>
  );
};

export default PurchaseConfirmationService;
