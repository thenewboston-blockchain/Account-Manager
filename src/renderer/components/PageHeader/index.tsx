import React, {FC, ReactNode} from 'react';

import TrustBadge from '@renderer/components/TrustBadge';

import './PageHeader.scss';

interface ComponentProps {
  rightContent?: ReactNode;
  title: string;
  trustScore?: number;
}

const PageHeader: FC<ComponentProps> = ({title, trustScore}) => {
  return (
    <div className="PageHeader">
      <div className="left-section">
        <h1 className="header-title">{title}</h1>
        {trustScore && <TrustBadge score={trustScore} />}
      </div>
      <div className="right-section">
        <h1>nice</h1>
      </div>
    </div>
  );
};

export default PageHeader;
