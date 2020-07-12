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
    <div className="ArrowToggle">
      <Icon className={clsx({expanded})} icon="play_arrow" onClick={onClick} />
    </div>
  );
};

export default ArrowToggle;
