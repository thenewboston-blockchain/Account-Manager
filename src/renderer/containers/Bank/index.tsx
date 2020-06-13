import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Button from '@renderer/components/Inputs/Button';

import './Bank.scss';

const Bank = () => {
  return (
    <div className="Bank">
      <div className="Bank__header">
        <div className="header__title">
          Your Bank: 223.125.11.178 <span className="title__points">98.62</span>
        </div>
        <Button className="manage-banks-button">Add To Managed Banks</Button>
        <Button>Register As Member</Button>
      </div>
      <Tabs TabIndicatorProps={{style: {background: 'var(--color-primary)'}}} value="overview">
        <Tab label="Overview" value="overview" />
        <Tab label="Members" value="members" />
        <Tab label="Transactions" value="transactions" />
        <Tab label="Banks" value="banks" />
        <Tab label="Validators" value="validators" />
      </Tabs>
      <div className="Bank__content">Stuff</div>
    </div>
  );
};

export default Bank;
