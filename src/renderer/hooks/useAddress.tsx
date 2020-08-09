import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {formatAddress} from '@renderer/utils/address';

const useAddress = (): string => {
  const {ipAddress, port, protocol} = useParams();
  return useMemo(() => formatAddress(ipAddress, port, protocol), [ipAddress, port, protocol]);
};

export default useAddress;
