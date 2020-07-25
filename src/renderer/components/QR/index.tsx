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
    const generateQR = async (): Promise<void> => {
      const url = await QRCode.toDataURL(text, {
        color: {
          dark: '#000000',
          light: '#0000',
        },
        margin,
        width,
      });
      setQR(<img alt="QR Code" src={url} />);
    };

    generateQR();
  }, [margin, text, width]);

  return <>{qr}</>;
};

export default QR;
