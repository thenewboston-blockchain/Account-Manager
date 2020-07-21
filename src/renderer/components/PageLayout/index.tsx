import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';

import './PageLayout.scss';

interface ComponentProps {
  className?: string;
  content: ReactNode;
  top: ReactNode;
}

const PageLayout: FC<ComponentProps> = ({className, content, top}) => {
  return (
    <div className={clsx('PageLayout', className)}>
      <div className={clsx('PageLayout__header', {...getCustomClassNames(className, '__header', true)})}>{top}</div>
      <hr className={clsx('PageLayout__divider', {...getCustomClassNames(className, '__divider', true)})} />
      <div className={clsx('PageLayout__content', {...getCustomClassNames(className, '__content', true)})}>
        {content}
      </div>
    </div>
  );
};

export default PageLayout;
