import React, {useEffect, useState} from 'react';
import QRCode from 'qrcode';

import Button from '@renderer/components/Button';
import DetailPanel from '@renderer/containers/DetailPanel';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTabs from '@renderer/components/PageTabs';

import './Account.scss';

const Account = () => {
  const [qr, setQr] = useState<any>();

  useEffect(() => {
    generateQR();
  }, []);

  const generateQR = async () => {
    try {
      const url = await QRCode.toDataURL('0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb', {
        color: {
          dark: '#000000',
          light: '#0000',
        },
        margin: 0,
        width: 140,
      });
      setQr(<img src={url} alt="" />);
    } catch (err) {
      return null;
    }
  };

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
              value: qr,
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
