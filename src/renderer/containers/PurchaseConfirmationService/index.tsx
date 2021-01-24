import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {AddressParams} from '@renderer/types';

import './PurchaseConfirmationService.scss';

const PurchaseConfirmationService: FC = () => {
  const {ipAddress, port: portStr, protocol} = useParams<Partial<AddressParams>>();
  return (
    <div className="PurchaseConfirmationService">
      <h1 className="PurchaseConfirmationService__header">Purchase Confirmation Services</h1>
    </div>
  );
};

export default PurchaseConfirmationService;
