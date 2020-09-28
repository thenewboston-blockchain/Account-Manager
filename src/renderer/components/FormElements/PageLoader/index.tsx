import React, {FC, memo} from 'react';
import clsx from 'clsx';

import './PageLoader.scss';

interface ComponentProps {
  className?: string;
}

const PageLoader: FC<ComponentProps> = ({className}) => {
  return <div className={clsx('PageLoader', className)} />;
};

export default memo(PageLoader);
