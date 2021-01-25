import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {AddressParams} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';

const useAddress = (): string => {
  const {ipAddress, port, protocol} = useParams<AddressParams>();
  return useMemo(() => (ipAddress && protocol && protocol ? formatAddress(ipAddress, port, protocol) : ''), [
    ipAddress,
    port,
    protocol,
  ]);
};

export default useAddress;
