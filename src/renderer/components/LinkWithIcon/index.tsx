import React, {FC, ReactNode} from 'react';

import './LinkWithIcon.scss';

interface LinkWithIconProps {
  icon: ReactNode;
  text: string;
}

const LinkWithIcon: FC<LinkWithIconProps> = ({icon, text}) => {
  return (
    <div className="LinkWithIcon">
      {icon}
      <div className="LinkWithIcon__text">{text}</div>
    </div>
  );
};

export default LinkWithIcon;
