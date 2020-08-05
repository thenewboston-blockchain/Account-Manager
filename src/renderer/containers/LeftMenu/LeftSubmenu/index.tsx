import React, {FC, ReactNode} from 'react';

import ArrowToggle from '@renderer/components/ArrowToggle';
import Icon, {IconType} from '@renderer/components/Icon';
import useBooleanState from '@renderer/hooks/useBooleanState';

import './LeftSubmenu.scss';

interface ComponentProps {
  leftIcon?: ReactNode;
  menuItems: ReactNode[];
  noExpandToggle?: boolean;
  rightOnClick?(): void;
  rightText?: string;
  title: string;
}

const LeftSubmenu: FC<ComponentProps> = ({leftIcon, menuItems, noExpandToggle, rightOnClick, rightText, title}) => {
  const [expanded, toggleExpanded] = useBooleanState(true);

  const renderHeaderContent = (): ReactNode => {
    return noExpandToggle ? (
      <>
        <span className="LeftSubmenu__title LeftSubmenu__title--only">{title}</span>
        {rightOnClick ? renderRightSection() : null}
      </>
    ) : (
      <>
        <div className="LeftSubmenu__left-items">
          {leftIcon || <ArrowToggle expanded={expanded} onClick={toggleExpanded} />}
          <span className="LeftSubmenu__title">{title}</span>
        </div>
        {rightOnClick ? renderRightSection() : null}
      </>
    );
  };

  const renderRightSection = (): ReactNode => {
    if (!rightOnClick) return null;
    if (rightText) {
      return (
        <span className="LeftSubmenu__right" onClick={rightOnClick}>
          {rightText}
        </span>
      );
    }

    return <Icon className="LeftSubmenu__add-icon" icon={IconType.plus} onClick={rightOnClick} />;
  };

  return (
    <div className="LeftSubmenu">
      <div className="LeftSubmenu__header">{renderHeaderContent()}</div>
      {expanded && menuItems}
    </div>
  );
};

export default LeftSubmenu;
