import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {formatAddress} from '@renderer/utils/address';

const useSocketAddress = (): string => {
  const {ipAddress, port} = useParams<any>();
  return useMemo(() => (ipAddress ? formatAddress(ipAddress, port, 'ws') : ''), [ipAddress, port]);
};

export default useSocketAddress;
