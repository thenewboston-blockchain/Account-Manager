import {createSelector} from '@reduxjs/toolkit';

import {formatAddressFromNode} from '@renderer/utils/address';
import {getActivePrimaryValidator, getManagedValidators} from './state';

export const getIsActivePrimaryValidator = (address: string) =>
  createSelector([getActivePrimaryValidator, () => address], (activePrimaryValidator) =>
    activePrimaryValidator ? formatAddressFromNode(activePrimaryValidator) === address : false,
  );

export const getIsManagedValidator = (address: string) =>
  createSelector([getManagedValidators, () => address], (managedValidators) => !!managedValidators[address]);
