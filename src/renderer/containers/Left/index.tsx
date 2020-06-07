import React from 'react';
import {useSelector} from 'react-redux';

import Card from '@renderer/components/Card';
import {RootState} from '@renderer/types/store';

import './Left.scss';

const LeftComponentSelector = ({banks, friends, points, validators, wallets}: RootState) => ({
  banks,
  friends,
  points,
  validators,
  wallets,
});

const Left = () => {
  const {banks, friends, points, validators, wallets} = useSelector(LeftComponentSelector);

  return (
    <div className="Left">
      <div className="Left__points">
        Points: <span>{points.toLocaleString()}</span>
      </div>
      <div className="Left__network-overview">
        <div className="network-overview__title">Network</div>
        <div className="network-overview__overview">
          <span>Banks: {banks.length}</span>
          <span>Validators: {validators.length}</span>
        </div>
      </div>
      <Card items={banks.map(({name, ipAddress}) => ({name, description: ipAddress}))} title="Managed Banks" />
      <Card
        items={validators.map(({name, ipAddress}) => ({name, description: ipAddress}))}
        title="Managed Validators"
      />
      <Card items={wallets.map(({name, id}) => ({name, description: id}))} title="Wallets" />
      <Card items={friends.map(({name, id}) => ({name, description: id}))} title="Friends" />
      <div className="Left__links">
        <a href="#">API Documentation</a>
        <a href="#">Tutorial & Guides</a>
        <a href="#">Settings</a>
      </div>
    </div>
  );
};

export default Left;
