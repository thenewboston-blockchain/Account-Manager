import React, {FC, memo} from 'react';
import clsx from 'clsx';

import TnbLogo from '@renderer/assets/logo.png';

interface ComponentProps {
  className?: string;
  size?: number;
}

const Logo: FC<ComponentProps> = ({className, size = 24}) => {
  return (
    <img
      alt="thenewboston logo"
      className={clsx('Logo', className)}
      src={TnbLogo}
      style={{height: size, width: size}}
    />
  );
};

export default memo(Logo);
