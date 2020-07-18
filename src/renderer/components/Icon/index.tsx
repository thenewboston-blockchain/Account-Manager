import React, {forwardRef} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';
import {ICON_MAPPING} from './icons';

type IconType = 'add' | 'arrow' | 'arrow-forward' | 'close' | 'more-vert' | 'play-arrow' | 'warning' | 'chevron';

interface ComponentProps {
  className?: string;
  disabled?: boolean;
  icon: IconType;
  onClick?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
  otherProps: object;
  matchContainer: boolean;
}

const Icon = forwardRef<HTMLSpanElement, ComponentProps>(
  ({className, matchContainer, disabled, icon, onClick, ...otherProps}, ref) => {
    if (ICON_MAPPING[icon]) {
      const IconComponent = ICON_MAPPING[icon];
      return (
        <IconComponent
          {...otherProps}
          matchContainer={matchContainer}
          className={className}
          onClick={disabled ? noop : onClick}
          ref={ref}
        />
      );
    }
    return null;
  },
);

export default Icon;
