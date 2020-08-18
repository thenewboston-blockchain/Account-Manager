import {AppNodeAddressData} from '@renderer/types';

export const getIsActivePrimaryValidator = (
  activePrimaryValidator: AppNodeAddressData | null,
  ipAddress: string,
  port: string,
  protocol: string,
): boolean => {
  if (!activePrimaryValidator) return false;
  const formattedPort = port === 'port' ? null : parseInt(port, 10);
  return (
    ipAddress === activePrimaryValidator.ip_address &&
    formattedPort === activePrimaryValidator.port &&
    protocol === activePrimaryValidator.protocol
  );
};
