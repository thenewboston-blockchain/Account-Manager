import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import DetailPanel from '@renderer/components/DetailPanel';
import Qr from '@renderer/components/Qr';
import {ActivePrimaryValidator} from '@renderer/types/entities';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

import './AccountOverview.scss';

const AccountOverviewSelector = ({
  session: {activePrimaryValidator},
}: RootState): {
  activePrimaryValidator: ActivePrimaryValidator | null;
} => ({
  activePrimaryValidator: activePrimaryValidator.entities,
});

const AccountOverview: FC = () => {
  const {accountNumber} = useParams();
  const {activePrimaryValidator} = useSelector(AccountOverviewSelector);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!activePrimaryValidator) return;

    const fetchData = async (): Promise<void> => {
      const {ip_address: ipAddress, port, protocol} = activePrimaryValidator;
      const address = formatAddress(ipAddress, port, protocol);
      const {data} = await axios.get(`${address}/account_balance/${accountNumber}`);
      setBalance(data.balance);
    };

    fetchData();
  }, [accountNumber, activePrimaryValidator]);

  const renderAccountNumber = (): ReactNode => (
    <>
      <div>{accountNumber}</div>
      <Qr className="AccountOverview__qr" text={accountNumber} />
    </>
  );

  return (
    <div className="AccountOverview">
      <DetailPanel
        className="AccountOverview__DetailPanel"
        items={[
          {
            key: 'Balance',
            value: balance || '-',
          },
          {
            key: 'Account Number',
            value: renderAccountNumber(),
          },
          {
            key: 'Signing Key',
            value: '**************************',
          },
        ]}
        title="Account Info"
      />
    </div>
  );
};

export default AccountOverview;
