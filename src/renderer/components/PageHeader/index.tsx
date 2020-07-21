import React, {FC, ReactNode} from 'react';

import './PageHeader.scss';

interface ComponentProps {
  leftTools?: ReactNode;
  rightContent?: ReactNode;
  title: string;
}

// TODO

const PageHeader: FC<ComponentProps> = ({leftTools, rightContent, title}) => {
  return (
    <div className="PageHeader">
      <div className="PageHeader__left-section">
        <h1 className="PageHeader__title">{title}</h1>
        {leftTools && leftTools}
      </div>
      {rightContent && <div className="PageHeader__right-section">{rightContent}</div>}
    </div>
  );
};

export default PageHeader;
