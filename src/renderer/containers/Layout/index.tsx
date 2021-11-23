import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import Account from '@renderer/containers/Account';
import Bank from '@renderer/containers/Bank';
import PurchaseConfirmationServices from '@renderer/containers/PurchaseConfirmationServices';
import Validator from '@renderer/containers/Validator';
import {getActiveBank, getActiveBankConfig} from '@renderer/selectors';

import {Protocol} from '@renderer/types';

import {formatPathWithSecureNode} from '@renderer/utils/address';

import LeftMenu from './LeftMenu';
import TopNav from './TopNav';
import './Layout.scss';

export const Layout: FC = () => {
  const activeBankConfig = useSelector(getActiveBankConfig);
  const activeBank = useSelector(getActiveBank);
  const protocol = activeBank?.protocol as Protocol;

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
            {activeBankConfig ? (
              <Redirect
                to={`/bank/${formatPathWithSecureNode({
                  address: activeBank?.ip_address,
                  node: activeBankConfig,
                  protocol,
                })}/overview`}
              />
            ) : null}
          </Route>
          <Route path="/main_window" exact>
            {activeBankConfig ? (
              <Redirect
                to={`/bank/${formatPathWithSecureNode({
                  address: activeBank?.ip_address,
                  node: activeBankConfig,
                  protocol,
                })}/overview`}
              />
            ) : null}
          </Route>
          <Route path="/account/:accountNumber">
            <Account />
          </Route>
          <Route path="/bank/:protocol/:ipAddress/:port">
            <Bank />
          </Route>
          <Route path="/purchase-confirmation-services/:protocol?/:ipAddress?/:port?">
            <PurchaseConfirmationServices />
          </Route>
          <Route path="/validator/:protocol/:ipAddress/:port">
            <Validator />
          </Route>
          <Route path="/reload" />
        </Switch>
      </div>
    </div>
  );
};

export default Layout;
