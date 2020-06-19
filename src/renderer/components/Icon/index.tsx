import React, {FC} from 'react';
import clsx from 'clsx';

type IconType = 'add' | 'arrow_back' | 'arrow_forward' | 'more_vert' | 'play_arrow';

interface ComponentProps {
  className?: string;
  icon: IconType;
  onClick?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

const Icon: FC<ComponentProps> = ({className, icon, onClick}) => {
  return (
    <span className={clsx('Icon material-icons', className)} onClick={onClick}>
      {icon}
    </span>
  );
};

export default Icon;
