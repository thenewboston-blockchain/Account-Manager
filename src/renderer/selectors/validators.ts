import {createCachedSelector} from 're-reselect';

import {RootState} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';

import {getPrimaryValidator} from './app';
import {getManagedValidators} from './state';
import {getNthArg} from './utils';

export const getIsActivePrimaryValidator: (state: RootState, address: string) => boolean = createCachedSelector(
  [getPrimaryValidator, getNthArg(1)],
  (activePrimaryValidator, address: string) =>
    activePrimaryValidator ? formatAddressFromNode(activePrimaryValidator) === address : false,
)(getNthArg(1));

export const getIsManagedValidator: (state: RootState, address: string) => boolean = createCachedSelector(
  [getManagedValidators, getNthArg(1)],
  (managedValidators, address: string) => !!managedValidators[address],
)(getNthArg(1));
