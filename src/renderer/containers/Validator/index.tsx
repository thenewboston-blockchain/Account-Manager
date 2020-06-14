import React from 'react';

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
      <button className="button-outline-default">Add to Managed Validators</button>
      <button className="button-default">Register Bank</button>
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
