import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {AccountNumberParams} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';

const useAddress = (): string => {
  const {ipAddress, port, protocol} = useParams<AccountNumberParams>();
  return useMemo(() => (ipAddress && protocol ? formatAddress(ipAddress, port, protocol) : ''), [
    ipAddress,
    port,
    protocol,
  ]);
};

export default useAddress;
