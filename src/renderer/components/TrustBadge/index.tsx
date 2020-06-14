import React, {FC} from 'react';

import './TrustBadge.scss';

interface ComponentProps {
  score: number;
}

const TrustBadge: FC<ComponentProps> = ({score}) => {
  return <span className="TrustBadge">{score}</span>;
};

export default TrustBadge;
