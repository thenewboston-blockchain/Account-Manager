import React, {FC, ReactNode, useEffect, useState} from 'react';
import QRCode from 'qrcode';

interface ComponentProps {
  margin?: number;
  text: string;
  width?: number;
}

const QR: FC<ComponentProps> = ({margin = 0, text, width = 140}) => {
  const [qr, setQR] = useState<ReactNode | null>(null);

  useEffect(() => {
    generateQR();
  }, []);

  const generateQR = async () => {
    try {
      const url = await QRCode.toDataURL(text, {
        color: {
          dark: '#000000',
          light: '#0000',
        },
        margin,
        width,
      });
      setQR(<img alt="QR Code" src={url} />);
    } catch (err) {
      return;
    }
  };

  return <>{qr}</>;
};

export default QR;
