import React, {FC} from 'react';
import clsx from 'clsx';

import Icon from '@renderer/components/Icon';

import './ArrowToggle.scss';

interface ComponentProps {
  expanded: boolean;
  onClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

const ArrowToggle: FC<ComponentProps> = ({expanded, onClick}) => {
  return (
    <>
      <Icon className={clsx('ArrowToggle', {expanded})} icon="play-arrow" onClick={onClick} />
    </>
  );
};

export default ArrowToggle;
