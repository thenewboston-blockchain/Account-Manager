import React, {FC, useState} from 'react';

import DetailPanel from '@renderer/components/DetailPanel';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTable from '@renderer/components/PageTable';
import PageTabs from '@renderer/components/PageTabs';
import Pagination from '@renderer/components/Pagination';
import QR from '@renderer/components/QR';
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
      <div className="Friend__panels">
        <DetailPanel
          className="Friend__DetailPanel"
          items={[
            {
              key: 'Balance',
              value: '184.35',
            },
            {
              key: 'Account Number',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              key: 'Signing Key',
              value: '**************************',
            },
            {
              key: 'QR Code',
              value: <QR text="0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb" />,
            },
          ]}
          title="Account Info"
        />
        <DetailPanel
          className="Friend__DetailPanel"
          items={[
            {
              key: 'Network ID',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              key: 'Account Number',
              value: 'Account Number',
            },
            {
              key: 'Protocol',
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
    <div className="Friend">
      <PageLayout content={renderTabContent(activeTab)} top={renderTop()} />
    </div>
  );
};

export default Friend;
