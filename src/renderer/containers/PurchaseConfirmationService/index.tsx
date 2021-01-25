import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {Button} from '@renderer/components/FormElements';
import {AddressParams} from '@renderer/types';

import './PurchaseConfirmationService.scss';

const PurchaseConfirmationService: FC = () => {
  const {ipAddress, port: portStr, protocol} = useParams<Partial<AddressParams>>();
  return (
    <div className="PurchaseConfirmationService">
      <div className="header">
        <h1 className="header__title">Purchase Confirmation Services</h1>
        <Button className="header__purchase-button">Purchase</Button>
      </div>
    </div>
  );
};

export default PurchaseConfirmationService;
