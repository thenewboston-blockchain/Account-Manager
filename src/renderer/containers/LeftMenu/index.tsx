import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Card from '@renderer/components/Card';
import LeftSubmenu from '@renderer/containers/LeftSubmenu';
import {RootState} from '@renderer/types/store';

import './LeftMenu.scss';

const LeftComponentSelector = ({banks, friends, points, validators, wallets}: RootState) => ({
  banks,
  friends,
  points,
  validators,
  wallets,
});

const LeftMenu = () => {
  const {banks, friends, points, validators, wallets} = useSelector(LeftComponentSelector);

  const renderSampleMenuItems = () => {
    return [...Array(8)].map((_, i) => <h1 key={i}>{i}</h1>);
  };

  return (
    <div className="LeftMenu">
      <div className="LeftMenu__points">
        <div className="points__title section-header">Points</div>
        <div className="points__amount">{points.toLocaleString()}</div>
      </div>
      <LeftSubmenu menuItems={[{name: 'Banks (99)'}, {name: 'Validators (231)'}]} title="Network" />
      <div className="LeftMenu__network-overview">
        <div className="network-overview__title section-header">Network</div>
        <div className="network-overview__overview">
          <NavLink to="/bank">Bank</NavLink>
          <span>Validators ({validators.length})</span>
        </div>
      </div>
      <Card items={banks.map(({name, ipAddress}) => ({name, description: ipAddress}))} title="Managed Banks" />
      <Card
        items={validators.map(({name, ipAddress}) => ({name, description: ipAddress}))}
        title="Managed Validators"
      />
      <Card items={wallets.map(({name, id}) => ({name, description: id}))} title="Wallets" />
      <Card items={friends.map(({name, id}) => ({name, description: id}))} title="Friends" />
      <div className="LeftMenu__links">{renderSampleMenuItems()}</div>
    </div>
  );
};

export default LeftMenu;
