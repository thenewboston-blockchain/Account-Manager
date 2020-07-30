import React from 'react';

import DetailPanel from '@renderer/components/DetailPanel';
import QR from '@renderer/components/QR';

import './Overview.scss';

const Overview = () => {
  return (
    <div className="Overview">
      <DetailPanel
        className="Account__DetailPanel"
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
    </div>
  );
};

export default Overview;
