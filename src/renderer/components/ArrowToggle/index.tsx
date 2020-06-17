import React, {FC} from 'react';

import './ArrowToggle.scss';

interface ComponentProps {
  expanded: boolean;
  onClick: any; // TODO: Update after Justin's branch gets merged
}

const ArrowToggle: FC<ComponentProps> = ({expanded, onClick}) => {
  return (
    <div className="ArrowToggle">
      <span className={`material-icons ${expanded ? 'expanded' : 'collapsed'}`} onClick={onClick}>
        play_arrow
      </span>
    </div>
  );
};

export default ArrowToggle;
