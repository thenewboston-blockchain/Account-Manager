import React, {FC, memo} from 'react';

import {ManagedAccount} from '@renderer/types';

import './OverviewBalance.scss';

interface ComponentProps {
  balance: number | null;
  loading: boolean;
  managedAccount?: ManagedAccount;
}

const OverviewBalance: FC<ComponentProps> = ({balance, loading, managedAccount}) => {
  if (loading) return <>-</>;

  return <span className="OverviewBalance">{(managedAccount?.balance || balance || 0).toLocaleString()}</span>;
};

export default memo(OverviewBalance);
