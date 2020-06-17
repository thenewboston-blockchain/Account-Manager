import React, {FC} from 'react';

import './ArrowToggle.scss';

interface ComponentProps {
  onClick: any; // TODO: Update after Justin's branch gets merged
  open: boolean;
}

const ArrowToggle: FC<ComponentProps> = ({onClick, open}) => {
  return (
    <div className="ArrowToggle">
      <span className={`material-icons ${open ? 'open' : 'closed'}`} onClick={onClick}>
        play_arrow
      </span>
    </div>
  );
};

export default ArrowToggle;
