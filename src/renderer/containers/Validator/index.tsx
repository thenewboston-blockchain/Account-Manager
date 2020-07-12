import React from 'react';

import Button from '@renderer/components/FormElements/Button';
import DetailPanel from '@renderer/containers/DetailPanel';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import TrustBadge from '@renderer/components/TrustBadge';

import './Validator.scss';

const Validator = () => {
  const renderDetailPanels = () => {
    return (
      <div className="detail-panels">
        <DetailPanel
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
          title="Validator Information"
        />
        <DetailPanel
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
          tableHead={
            <thead>
              <tr>
                <th>Bank Trust Level</th>
                <th>Tx Fee (Points)</th>
              </tr>
            </thead>
          }
          title="Trust Levels"
        />
      </div>
    );
  };

  const renderRightPageHeaderButtons = () => (
    <>
      <Button variant="outlined">Add to Managed Validators</Button>
      <Button>Register Bank</Button>
    </>
  );

  const renderTop = () => {
    return (
      <>
        <PageHeader
          leftTools={<TrustBadge score={98.34} />}
          rightContent={renderRightPageHeaderButtons()}
          title="My Validator (223.125.111.178)"
        />
        <PageTabs
          items={[
            {
              name: 'Overview',
              active: true,
            },
            {
              name: 'Members',
              active: false,
            },
            {
              name: 'Transactions',
              active: false,
            },
            {
              name: 'Banks',
              active: false,
            },
            {
              name: 'Validators',
              active: false,
            },
          ]}
        />
      </>
    );
  };

  return (
    <div className="Validator">
      <PageLayout content={renderDetailPanels()} top={renderTop()} />
    </div>
  );
};

export default Validator;
