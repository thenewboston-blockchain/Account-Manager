import React from 'react';
import {useSelector} from 'react-redux';

import Card from '@renderer/components/Card';
import DescriptionIcon from '@renderer/components/Icons/DescriptionIcon';
import LinkWithIcon from '@renderer/components/LinkWithIcon';
import PlayCircleFilledIcon from '@renderer/components/Icons/PlayCircleFilledIcon';
import SettingsIcon from '@renderer/components/Icons/SettingsIcon';
import {RootState} from '@renderer/types/store';

import '../LeftMenu/Left.scss';

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
      <div className="Left__company-logo">
        <img className="company-logo__logo" src={require('@renderer/assets/logo.png')} alt="tnb" />
        <div className="company-logo__text">thenewboston</div>
      </div>
      <div className="Left__points">
        <div className="points__title section-header">Points</div>
        <div className="points__amount">{points.toLocaleString()}</div>
      </div>
      <div className="Left__network-overview">
        <div className="network-overview__title section-header">Network</div>
        <div className="network-overview__overview">
          <span>Banks ({banks.length})</span>
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
      <div className="Left__links">
        <LinkWithIcon icon={<DescriptionIcon />} text="API Documentation" />
        <LinkWithIcon icon={<PlayCircleFilledIcon />} text="Tutorial & Guides" />
        <LinkWithIcon icon={<SettingsIcon />} text="Settings" />
      </div>
    </div>
  );
};

export default Left;
