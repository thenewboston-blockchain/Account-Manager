import React, {FC, memo} from 'react';

import './OverviewBalance.scss';

interface ComponentProps {
  balance: number | null;
  loading: boolean;
  managedAccountBalance?: number;
}

const OverviewBalance: FC<ComponentProps> = ({balance, loading, managedAccountBalance}) => {
  if (loading) return <>-</>;

  return <span className="OverviewBalance">{(managedAccountBalance || balance || 0).toLocaleString()}</span>;
};

export default memo(OverviewBalance);
