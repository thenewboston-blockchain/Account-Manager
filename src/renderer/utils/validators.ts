import {AppNodeAddressData, Dict, ManagedValidator} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';

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

export const getIsManagedValidator = (
  managedValidators: Dict<ManagedValidator>,
  ipAddress: string,
  port: string,
  protocol: string,
): boolean => {
  const key = formatAddress(ipAddress, port, protocol);
  return !!managedValidators[key];
};
