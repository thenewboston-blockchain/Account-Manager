import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {AddressParams} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';

const useAddress = (): string => {
  const {ipAddress, port, protocol} = useParams<AddressParams>();
  return useMemo(() => {
    if (ipAddress && protocol) {
      return formatAddress(protocol, ipAddress, port);
    }
    return '';
  }, [ipAddress, port, protocol]);
};

export default useAddress;
