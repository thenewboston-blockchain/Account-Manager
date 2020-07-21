import React, {FC, useState} from 'react';
import PageHeader from '@renderer/components/PageHeader';
import PageTabs from '@renderer/components/PageTabs';
import Pagination from '@renderer/components/Pagination';
import QR from '@renderer/components/QR';
import DetailPanel from '@renderer/components/DetailPanel';
import PageLayout from '@renderer/components/PageLayout';
import PageTable from '@renderer/components/PageTable';
import transactionSampleData from '@renderer/mock/TransactionSampleData';

import './Friend.scss';

enum Tabs {
  OVERVIEW = 'Overview',
  TRANSACTIONS = 'Transactions',
}
const tabs = [Tabs.OVERVIEW, Tabs.TRANSACTIONS];

const Friend: FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

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

  const renderPageTable = () => (
    <>
      <PageTable items={transactionSampleData} />
      <Pagination />
    </>
  );

  const renderTabContent = (activeTab: Tabs) => {
    const tabContent = {
      [Tabs.OVERVIEW]: renderDetailPanels(),
      [Tabs.TRANSACTIONS]: renderPageTable(),
    };
    return tabContent[activeTab] || null;
  };

  const renderTop = () => (
    <>
      <PageHeader title="Donations (43hawrjkef243d)" />
      <PageTabs
        items={tabs.map((item) => ({
          name: item.toString(),
          active: activeTab === item,
          onClick: (name) => {
            setActiveTab(name as Tabs);
          },
        }))}
      />
    </>
  );

  return (
    <div className="Account">
      <PageLayout content={renderTabContent(activeTab)} top={renderTop()} />
    </div>
  );
};

export default Friend;
