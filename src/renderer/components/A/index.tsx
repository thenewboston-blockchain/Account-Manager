import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';

interface ComponentProps {
  className?: string;
  children: ReactNode;
  href: string;
}

const A: FC<ComponentProps> = ({children, className, href}) => {
  return (
    <a className={clsx('A', className)} href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
};

export default A;
