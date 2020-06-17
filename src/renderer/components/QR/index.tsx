import React, {FC, useEffect, useState} from 'react';
import QRCode from 'qrcode';

interface ComponentProps {
  margin: number;
  text: string;
  width: number;
}

const QR: FC<ComponentProps> = ({margin, text, width}) => {
  const [qr, setQR] = useState<any>();

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
      return null;
    }
  };

  return qr || null;
};

export default QR;
