import {CleanStatus} from '@renderer/types';

export const getCleanButtonLabel = (cleanStatus: CleanStatus | null): string => {
  switch (cleanStatus) {
    case CleanStatus.cleaning:
      return 'Stop';
    case CleanStatus.stopRequested:
      return '';
    default:
      return 'Clean';
  }
};

export const getCleanClassModifier = (cleanStatus: CleanStatus | null): string => {
  switch (cleanStatus) {
    case CleanStatus.cleaning:
      return '--active';
    case CleanStatus.stopRequested:
      return '--active';
    default:
      return '--danger';
  }
};

export const getCleanDisplay = (cleanStatus: CleanStatus | null): string => {
  switch (cleanStatus) {
    case CleanStatus.cleaning:
      return 'Cleaning';
    case CleanStatus.stopRequested:
      return 'Stop Requested';
    default:
      return 'Not Cleaning';
  }
};
