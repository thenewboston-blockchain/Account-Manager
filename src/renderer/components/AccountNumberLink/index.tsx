import React, {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';

import './AccountNumberLink.scss';

interface ComponentProps {
  accountNumber: string;
}

const AccountNumberLink: FC<ComponentProps> = ({accountNumber}) => {
  return (
    <NavLink className="AccountNumberLink" to={`/account/${accountNumber}/overview`}>
      {accountNumber}
    </NavLink>
  );
};

export default memo(AccountNumberLink);
