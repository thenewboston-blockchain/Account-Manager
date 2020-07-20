import React, {FC} from 'react';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';

import './ArrowToggle.scss';

interface ComponentProps {
  className?: string;
  expanded: boolean;
  onClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>): void;
}

const ArrowToggle: FC<ComponentProps> = ({className, expanded, onClick}) => {
  return (
    <Icon
      className={clsx('ArrowToggle', className, {'ArrowToggle--expanded': expanded})}
      icon={IconType.play}
      onClick={onClick}
      size={16}
    />
  );
};

export default ArrowToggle;
