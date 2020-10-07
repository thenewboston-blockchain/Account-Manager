import React, {FC, ReactNode} from 'react';

import DropdownMenuButton, {DropdownMenuDirection, DropdownMenuOption} from '@renderer/components/DropdownMenuButton';

import './PageHeader.scss';

interface ComponentProps {
  dropdownMenuOptions?: DropdownMenuOption[];
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  title: string;
}

const PageHeader: FC<ComponentProps> = ({dropdownMenuOptions, leftContent, rightContent, title}) => {
  return (
    <div className="PageHeader">
      <div className="PageHeader__left-section">
        <h1 className="PageHeader__title">{title}</h1>
        {leftContent}
      </div>
      {(dropdownMenuOptions?.length || rightContent) && (
        <div className="PageHeader__right-section">
          {rightContent}
          {dropdownMenuOptions?.length ? (
            <DropdownMenuButton
              className="PageHeader__DropdownMenuButton"
              direction={DropdownMenuDirection.left}
              options={dropdownMenuOptions}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
