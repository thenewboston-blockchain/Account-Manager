import React from 'react';

import DetailPanel from '@renderer/containers/DetailPanel';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTabs from '@renderer/components/PageTabs';

import './Validator.scss';

const Validator = () => {
  const renderDetailPanels = () => {
    return (
      <div className="detail-panels">
        <DetailPanel
          heading="Validator Information"
          items={[
            {
              attribute: 'Node Type',
              value: 'Validator',
            },
            {
              attribute: 'Network ID',
              value: 'Gn53dfs4a2z',
            },
            {
              attribute: 'Protocol',
              value: 'http',
            },
          ]}
        />
        <DetailPanel
          heading="Trust Levels"
          items={[
            {
              attribute: '90',
              value: '1.00',
            },
            {
              attribute: '70',
              value: '1.22',
            },
          ]}
        />
      </div>
    );
  };

  const renderRightPageHeaderButtons = () => (
    <>
      <button className="button-outline-default">Add to Managed Validators</button>
      <button className="button-default">Register Bank</button>
    </>
  );

  const renderTop = () => {
    return (
      <>
        <PageHeader
          rightContent={renderRightPageHeaderButtons()}
          title="My Validator (223.125.111.178)"
          trustScore={98.34}
        />
        <PageTabs />
      </>
    );
  };

  return (
    <div className="Validator">
      <PageLayout top={renderTop()} middle={renderDetailPanels()} />
    </div>
  );
};

export default Validator;
