import React, {FC, ReactNode} from 'react';
import {Icon, IconType} from '@thenewboston/ui';

import ArrowToggle from '@renderer/components/ArrowToggle';
import {useBooleanState} from '@renderer/hooks';

import './LeftSubmenu.scss';

interface ComponentProps {
  leftIcon?: ReactNode;
  menuItems: ReactNode[];
  rightOnClick?(): void;
  rightText?: string;
  title: string;
}

const LeftSubmenu: FC<ComponentProps> = ({leftIcon, menuItems, rightOnClick, rightText, title}) => {
  const [expanded, toggleExpanded] = useBooleanState(true);

  const renderHeaderContent = (): ReactNode => {
    return (
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

    return (
      <Icon className="LeftSubmenu__add-icon" icon={IconType.plus} onClick={rightOnClick} size={20} totalSize={20} />
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
