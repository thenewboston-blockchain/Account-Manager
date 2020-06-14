import React, {FC, ReactNode} from 'react';

import './PageHeader.scss';

interface ComponentProps {
  leftTools?: ReactNode;
  rightContent?: ReactNode;
  title: string;
}

const PageHeader: FC<ComponentProps> = ({leftTools, rightContent, title}) => {
  return (
    <div className="PageHeader">
      <div className="left-section">
        <h1 className="header-title">{title}</h1>
        {leftTools && leftTools}
      </div>
      {rightContent && <div className="right-section">{rightContent}</div>}
    </div>
  );
};

export default PageHeader;
