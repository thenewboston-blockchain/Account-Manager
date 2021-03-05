import React, {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';

import ExpandableText from '@renderer/components/ExpandableText';
import './AccountLink.scss';

interface ComponentProps {
  accountNumber: string;
  expanded: boolean;
}

const AccountLink: FC<ComponentProps> = ({accountNumber, expanded}) => {
  return (
    <NavLink className="AccountLink" to={`/account/${accountNumber}/overview`}>
      <ExpandableText expanded={expanded} text={accountNumber} />
    </NavLink>
  );
};

export default memo(AccountLink);
