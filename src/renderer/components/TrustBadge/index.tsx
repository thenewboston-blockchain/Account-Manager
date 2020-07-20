import React, {FC} from 'react';
import clsx from 'clsx';

import './TrustBadge.scss';

interface ComponentProps {
  className?: string;
  score: number;
}

const TrustBadge: FC<ComponentProps> = ({className, score}) => {
  return <span className={clsx('TrustBadge', className)}>{score}</span>;
};

export default TrustBadge;
