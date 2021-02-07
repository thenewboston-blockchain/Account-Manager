import React, {FC, useRef} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

import Icon, {IconType} from '@renderer/components/Icon';

import './ArrowToggle.scss';

interface ComponentProps {
  className?: string;
  expanded: boolean;
  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const ArrowToggle: FC<ComponentProps> = ({className, expanded, onClick}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick(e);
    iconRef.current?.blur();
  };

  return (
    <Icon
      className={clsx('ArrowToggle', className, {
        'ArrowToggle--expanded': expanded,
        ...bemify(className, '--expanded', expanded),
      })}
      icon={IconType.play}
      onClick={handleClick}
      ref={iconRef}
      size={16}
      totalSize={16}
    />
  );
};

export default ArrowToggle;
