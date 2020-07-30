import React, {ReactNode} from 'react';

import DetailPanel from '@renderer/components/DetailPanel';
import QR from '@renderer/components/QR';

import './AccountOverview.scss';

const AccountOverview = (): JSX.Element => {
  const renderAccountNumber = (): ReactNode => (
    <>
      <div>0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb</div>
      <QR text="0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb" />
    </>
  );

  return (
    <div className="AccountOverview">
      <DetailPanel
        className="AccountOverview__DetailPanel"
        items={[
          {
            key: 'Balance',
            value: '184.35',
          },
          {
            key: 'Account Number',
            value: renderAccountNumber(),
          },
          {
            key: 'Signing Key',
            value: '**************************',
          },
        ]}
        title="Account Info"
      />
    </div>
  );
};

export default AccountOverview;
