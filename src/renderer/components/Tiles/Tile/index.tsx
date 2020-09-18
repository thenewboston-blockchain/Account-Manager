import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';

import './Tile.scss';

interface ComponentProps {
  children: ReactNode;
  className?: string;
}

const Tile: FC<ComponentProps> = ({children, className}) => {
  return <div className={clsx('Tile', className)}>{children}</div>;
};

export default Tile;
