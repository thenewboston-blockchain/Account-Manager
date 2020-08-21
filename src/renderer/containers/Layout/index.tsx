import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import Account from '@renderer/containers/Account';
import Bank from '@renderer/containers/Bank';
import Friend from '@renderer/containers/Friend';
import LeftMenu from '@renderer/containers/LeftMenu';
import TopNav from '@renderer/containers/TopNav';
import Validator from '@renderer/containers/Validator';
import {getActiveBankConfig} from '@renderer/selectors';
import {formatPathFromNode} from '@renderer/utils/address';

import './Layout.scss';

export const Layout: FC = () => {
  const activeBankConfig = useSelector(getActiveBankConfig);

  return (
    <div className="Layout">
      <div className="Layout__top">
        <TopNav />
      </div>
      <div className="Layout__left">
        <LeftMenu />
      </div>
      <div className="Layout__right">
        <Switch>
          <Route path="/" exact>
            {activeBankConfig ? <Redirect to={`/bank/${formatPathFromNode(activeBankConfig)}/overview`} /> : null}
          </Route>
          <Route path="/account/:accountNumber">
            <Account />
          </Route>
          <Route path="/friend/:accountNumber">
            <Friend />
          </Route>
          <Route path="/bank/:protocol/:ipAddress/:port">
            <Bank />
          </Route>
          <Route path="/friend">
            <Friend />
          </Route>
          <Route path="/validator/:protocol/:ipAddress/:port">
            <Validator />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Layout;
