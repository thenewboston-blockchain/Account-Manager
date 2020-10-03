import React, {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';

import './AccountLink.scss';

interface ComponentProps {
  accountNumber: string;
  managedType: string;
}

const AccountLink: FC<ComponentProps> = ({accountNumber, managedType}) => {
  return (
    <NavLink className="AccountLink" to={`/${managedType}/${accountNumber}/overview`}>
      {accountNumber}
    </NavLink>
  );
};

export default memo(AccountLink);
