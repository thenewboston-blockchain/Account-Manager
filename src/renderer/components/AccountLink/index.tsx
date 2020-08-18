import React, {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';

import './AccountLink.scss';

interface ComponentProps {
  accountNumber: string;
}

const AccountLink: FC<ComponentProps> = ({accountNumber}) => {
  return (
    <NavLink className="AccountLink" to={`/account/${accountNumber}/overview`}>
      {accountNumber}
    </NavLink>
  );
};

export default memo(AccountLink);
