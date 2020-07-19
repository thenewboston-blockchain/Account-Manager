import React, {forwardRef} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';

type IconType = 'add' | 'arrow_back' | 'arrow_forward' | 'close' | 'more_vert' | 'play_arrow' | 'warning';

interface ComponentProps {
  className?: string;
  disabled?: boolean;
  icon: IconType;
  onClick?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

const Icon = forwardRef<HTMLSpanElement, ComponentProps>(({className, disabled, icon, onClick}, ref) => {
  return (
    <span className={clsx('Icon material-icons', {disabled}, className)} onClick={disabled ? noop : onClick} ref={ref}>
      {icon}
    </span>
  );
});

export default Icon;
