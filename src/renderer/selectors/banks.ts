import {createSelector} from '@reduxjs/toolkit';

import {formatAddressFromNode} from '@renderer/utils/address';
import {getActiveBank, getManagedBanks} from './state';

export const getIsActiveBank = (address: string) =>
  createSelector([getActiveBank, () => address], (activeBank) =>
    activeBank ? formatAddressFromNode(activeBank) === address : false,
  );

export const getIsManagedBank = (address: string) =>
  createSelector([getManagedBanks, () => address], (managedBanks) => !!managedBanks[address]);
