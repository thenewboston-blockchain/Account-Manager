import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

import './PageLayout.scss';

interface ComponentProps {
  className?: string;
  content: ReactNode;
  top: ReactNode;
}

const PageLayout: FC<ComponentProps> = ({className, content, top}) => {
  return (
    <div className={clsx('PageLayout', className)}>
      <div className={clsx('PageLayout__header', {...bemify(className, '__header')})}>{top}</div>
      <hr className={clsx('PageLayout__divider', {...bemify(className, '__divider')})} />
      <div className={clsx('PageLayout__content', {...bemify(className, '__content')})}>{content}</div>
    </div>
  );
};

export default PageLayout;
