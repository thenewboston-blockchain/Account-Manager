import React, {FC, ReactNode} from 'react';

import TrustBadge from '@renderer/components/TrustBadge';

import './PageHeader.scss';

interface ComponentProps {
  leftTools?: ReactNode;
  rightContent?: ReactNode;
  title: string;
  trustScore?: number;
}

const PageHeader: FC<ComponentProps> = ({leftTools, rightContent, title, trustScore}) => {
  return (
    <div className="PageHeader">
      <div className="left-section">
        <h1 className="header-title">{title}</h1>
        {trustScore && <TrustBadge score={trustScore} />}
        {leftTools && leftTools}
      </div>
      {rightContent && <div className="right-section">{rightContent}</div>}
    </div>
  );
};

export default PageHeader;
