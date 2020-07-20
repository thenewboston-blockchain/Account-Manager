import React, {FC, ReactNode} from 'react';

import './PageLayout.scss';

interface ComponentProps {
  content: ReactNode;
  top: ReactNode;
}

const PageLayout: FC<ComponentProps> = ({content, top}) => {
  return (
    <div className="PageLayout">
      <div className="PageLayout-header">{top}</div>
      <hr className="PageLayout-divider" />
      <div className="PageLayout-content">{content}</div>
    </div>
  );
};

export default PageLayout;
