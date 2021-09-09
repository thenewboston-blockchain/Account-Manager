import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {AddressParams} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';

const useSocketAddress = (): string => {
  const {ipAddress, port} = useParams<AddressParams>();
  return useMemo(() => (ipAddress ? formatAddress('ws', ipAddress, port) : ''), [ipAddress, port]);
};

export default useSocketAddress;
