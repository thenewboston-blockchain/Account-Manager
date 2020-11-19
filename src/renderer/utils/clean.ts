import {CleanStatus} from '@renderer/types';

export const getCleanButtonLabel = (cleanStatus: CleanStatus | null): string => {
  switch (cleanStatus) {
    case CleanStatus.cleaning:
      return 'Stop';
    case CleanStatus.notCleaning:
      return 'Clean';
    case CleanStatus.stopRequested:
      return '';
    default:
      return '';
  }
};

export const getCleanClassModifier = (cleanStatus: CleanStatus | null): string => {
  switch (cleanStatus) {
    case CleanStatus.cleaning:
      return '--active';
    case CleanStatus.notCleaning:
      return '--danger';
    case CleanStatus.stopRequested:
      return '--active';
    default:
      return '';
  }
};

export const getCleanDisplay = (cleanStatus: CleanStatus | null): string => {
  switch (cleanStatus) {
    case CleanStatus.cleaning:
      return 'Cleaning';
    case CleanStatus.notCleaning:
      return 'Not Cleaning';
    case CleanStatus.stopRequested:
      return 'Stop Requested';
    default:
      return '-';
  }
};
