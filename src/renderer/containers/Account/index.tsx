import React from 'react';

import Button from '@renderer/components/Button';
import DetailPanel from '@renderer/containers/DetailPanel';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import QR from '@renderer/components/QR';

import './Account.scss';

const Account = () => {
  const renderDetailPanels = () => {
    return (
      <div className="detail-panels">
        <DetailPanel
          items={[
            {
              attribute: 'Balance',
              value: '184.35',
            },
            {
              attribute: 'Account Number',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              attribute: 'Signing Key',
              value: '**************************',
            },
            {
              attribute: 'QR Code',
              value: <QR text="0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb" />,
            },
          ]}
          title="Account Info"
        />
        <DetailPanel
          items={[
            {
              attribute: 'Network ID',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              attribute: 'Account Number',
              value: 'Account Number',
            },
            {
              attribute: 'Protocol',
              value: 'http',
            },
          ]}
          title="Bank Info"
        />
      </div>
    );
  };

  const renderRightPageHeaderButtons = () => (
    <>
      <Button>Send Points</Button>
    </>
  );

  const renderTop = () => (
    <>
      <PageHeader rightContent={renderRightPageHeaderButtons()} title="Donations (43hawrjkef243d)" />
      <PageTabs
        items={[
          {
            name: 'Overview',
            active: true,
          },
          {
            name: 'Transactions',
            active: false,
          },
        ]}
      />
    </>
  );

  return (
    <div className="Account">
      <PageLayout content={renderDetailPanels()} top={renderTop()} />
    </div>
  );
};

export default Account;
