import React, {FC, ReactNode} from 'react';

import DropdownMenuButton, {DropdownMenuDirection, DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import TrustBadge from '@renderer/components/TrustBadge';

import './PageHeader.scss';

interface ComponentProps {
  dropdownMenuOptions?: DropdownMenuOption[];
  rightContent?: ReactNode;
  title: string;
  trustScore?: number;
}

const PageHeader: FC<ComponentProps> = ({dropdownMenuOptions, rightContent, title, trustScore}) => {
  return (
    <div className="PageHeader">
      <div className="PageHeader__left-section">
        <h1 className="PageHeader__title">{title}</h1>
        {trustScore ? <TrustBadge className="PageHeader__TrustBadge" score={trustScore} /> : null}
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
