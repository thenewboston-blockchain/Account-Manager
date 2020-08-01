import React, {FC, ReactNode} from 'react';

import ArrowToggle from '@renderer/components/ArrowToggle';
import Icon, {IconType} from '@renderer/components/Icon';
import useBooleanState from '@renderer/hooks/useBooleanState';

import './LeftSubmenu.scss';

interface ComponentProps {
  addOnClick?(): void;
  leftIcon?: ReactNode;
  menuItems: ReactNode[];
  title: string;
  titleOnly?: boolean;
}

const LeftSubmenu: FC<ComponentProps> = ({addOnClick, leftIcon, menuItems, title, titleOnly}) => {
  const [expanded, toggleExpanded] = useBooleanState(true);

  const renderHeaderContent = (): ReactNode => {
    return titleOnly ? (
      <span className="LeftSubmenu__title LeftSubmenu__title--only">{title}</span>
    ) : (
      <>
        <div className="LeftSubmenu__left-items">
          {leftIcon || <ArrowToggle expanded={expanded} onClick={toggleExpanded} />}
          <span className="LeftSubmenu__title">{title}</span>
        </div>
        {addOnClick ? <Icon className="LeftSubmenu__add-icon" icon={IconType.plus} onClick={addOnClick} /> : null}
      </>
    );
  };

  return (
    <div className="LeftSubmenu">
      <div className="LeftSubmenu__header">{renderHeaderContent()}</div>
      {expanded && menuItems}
    </div>
  );
};

export default LeftSubmenu;
