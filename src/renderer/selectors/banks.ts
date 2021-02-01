import {createSelector} from '@reduxjs/toolkit';
import {createCachedSelector} from 're-reselect';
import pickBy from 'lodash/pickBy';

import {getNthArg} from '@renderer/selectors/utils';
import {Dict, ManagedNode, RootState} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';

import {getActiveBank} from './app';
import {getManagedBanks} from './state';

export const getAuthenticatedBanks = createSelector(
  [getManagedBanks],
  (managedBanks): Dict<ManagedNode> => {
    return pickBy(managedBanks, (managedBank) => !!managedBank.account_signing_key && !!managedBank.nid_signing_key);
  },
);

export const getHasAuthenticatedBanks = createSelector([getManagedBanks], (managedBanks): boolean => {
  return !!Object.values(managedBanks).find(
    (managedBank) => !!managedBank.account_signing_key && !!managedBank.nid_signing_key,
  );
});

export const getIsActiveBank: (state: RootState, address: string) => boolean = createCachedSelector(
  [getActiveBank, getNthArg(1)],
  (activeBank, address: string) => (activeBank ? formatAddressFromNode(activeBank) === address : false),
)(getNthArg(1));

export const getIsManagedBank: (state: RootState, address: string) => boolean = createCachedSelector(
  [getManagedBanks, getNthArg(1)],
  (managedBanks, address: string) => !!managedBanks[address],
)(getNthArg(1));
