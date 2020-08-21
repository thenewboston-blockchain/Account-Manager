import {createSelector} from '@reduxjs/toolkit';
import memoize from 'lodash/memoize';

import {formatAddressFromNode} from '@renderer/utils/address';
import {getActivePrimaryValidator, getManagedValidators} from './state';

const getIsActivePrimaryValidatorFn = (address: string) =>
  createSelector([getActivePrimaryValidator, () => address], (activePrimaryValidator) =>
    activePrimaryValidator ? formatAddressFromNode(activePrimaryValidator) === address : false,
  );
export const getIsActivePrimaryValidator = memoize(getIsActivePrimaryValidatorFn);

const getIsManagedValidatorFn = (address: string) =>
  createSelector([getManagedValidators, () => address], (managedValidators) => !!managedValidators[address]);
export const getIsManagedValidator = memoize(getIsManagedValidatorFn);
