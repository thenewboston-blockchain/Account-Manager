import React from 'react';

import PageHeader from '@renderer/components/PageHeader';

import './Bank.scss';

const Bank = () => {
  return (
    <div className="Bank">
      <PageHeader title="Digital Ocean Bank (223.125.111.178)" trustScore={98.34} />
    </div>
  );
};

export default Bank;
