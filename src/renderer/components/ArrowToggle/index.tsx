import React, {FC} from 'react';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';

import './ArrowToggle.scss';

interface ComponentProps {
  expanded: boolean;
  onClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>): void;
}

const ArrowToggle: FC<ComponentProps> = ({expanded, onClick}) => {
  return (
    <Icon
      className={clsx('ArrowToggle', {'ArrowToggle--expanded': expanded})}
      icon={IconType.play}
      onClick={onClick}
      size={16}
    />
  );
};

export default ArrowToggle;
