import React, {FC} from 'react';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';

import './ArrowToggle.scss';

interface ComponentProps {
  expanded: boolean;
  onClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

const ArrowToggle: FC<ComponentProps> = ({expanded, onClick}) => {
  return (
    <div className="ArrowToggle">
      <Icon className={clsx({expanded})} icon={IconType.play} onClick={onClick} size={16} />
    </div>
  );
};

export default ArrowToggle;
