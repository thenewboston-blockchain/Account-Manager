import React, {FC} from 'react';
import clsx from 'clsx';

import './ArrowToggle.scss';

interface ComponentProps {
  expanded: boolean;
  onClick: any; // TODO: Update after Justin's branch gets merged
}

const ArrowToggle: FC<ComponentProps> = ({expanded, onClick}) => {
  return (
    <div className="ArrowToggle">
      <span className={clsx('material-icons', {expanded})} onClick={onClick}>
        play_arrow
      </span>
    </div>
  );
};

export default ArrowToggle;
