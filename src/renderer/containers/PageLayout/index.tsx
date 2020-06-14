import React, {FC, ReactNode} from 'react';

import './PageLayout.scss';

interface ComponentProps {
  top: ReactNode;
  middle: ReactNode;
  bottom: ReactNode;
}

const PageLayout: FC<ComponentProps> = ({bottom, middle, top}) => {
  return (
    <div className="PageLayout">
      <div className="PageLayout-header">{top}</div>
      <div className="PageLayout-content">{middle}</div>
      <div className="PageLayout-footer">{bottom}</div>
    </div>
  );
};

export default PageLayout;
