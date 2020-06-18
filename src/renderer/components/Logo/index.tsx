import React, {FC, memo} from 'react';
import clsx from 'clsx';

interface ComponentProps {
  className?: string;
  size?: number;
}

const Logo: FC<ComponentProps> = ({className, size = 24}) => {
  return (
    <img
      alt="thenewboston logo"
      className={clsx('Logo', className)}
      src={require('@renderer/assets/logo.png')}
      style={{height: size, width: size}}
    />
  );
};

export default memo(Logo);
