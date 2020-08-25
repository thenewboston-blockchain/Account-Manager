import {createCachedSelector} from 're-reselect';

import {getNthArg} from '@renderer/selectors/utils';
import {RootState} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';

import {getActiveBank} from './app';
import {getManagedBanks} from './state';

export const getIsActiveBank: (state: RootState, address: string) => boolean = createCachedSelector(
  [getActiveBank, getNthArg(1)],
  (activeBank, address: string) => (activeBank ? formatAddressFromNode(activeBank) === address : false),
)(getNthArg(1));

export const getIsManagedBank: (state: RootState, address: string) => boolean = createCachedSelector(
  [getManagedBanks, getNthArg(1)],
  (managedBanks, address: string) => !!managedBanks[address],
)(getNthArg(1));
