import React, {FC} from 'react';

import CreateIcon from '@renderer/components/Icons/CreateIcon';
import UnfoldLessIcon from '@renderer/components/Icons/UnfoldLessIcon';

import './Card.scss';

interface CardItem {
  name: string;
  description: string;
}

interface CardProps {
  items: CardItem[];
  title: string;
}

const Card: FC<CardProps> = ({items, title}) => {
  return (
    <div className="Card">
      <div className="Card__header">
        <span className="header__title">{title}</span>
        <CreateIcon />
        <UnfoldLessIcon />
      </div>
      {items.map(({name, description}) => (
        <a className="Card__link" href="#">
          {name} ({description})
        </a>
      ))}
    </div>
  );
};

export default Card;
