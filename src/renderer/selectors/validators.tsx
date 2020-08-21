import {createSelector} from '@reduxjs/toolkit';
import memoize from 'lodash/memoize';

import {formatAddressFromNode} from '@renderer/utils/address';
import {getActivePrimaryValidator, getManagedValidators} from './state';

export const getIsActivePrimaryValidator = memoize((address: string) =>
  createSelector([getActivePrimaryValidator, () => address], (activePrimaryValidator) =>
    activePrimaryValidator ? formatAddressFromNode(activePrimaryValidator) === address : false,
  ),
);

export const getIsManagedValidator = memoize((address: string) =>
  createSelector([getManagedValidators, () => address], (managedValidators) => !!managedValidators[address]),
);
