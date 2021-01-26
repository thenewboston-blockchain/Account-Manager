import omit from 'lodash/omit';

export type SelectedValidatorState = {
  [validatorNid: string]: true;
};

enum SelectedValidatorTypes {
  clearAll = 'clearAll',
  toggle = 'toggle',
}

export interface SelectedValidatorAction {
  type: SelectedValidatorTypes;
  payload?: string;
}

export const clearSelectedValidator = (): SelectedValidatorAction => {
  return {
    type: SelectedValidatorTypes.clearAll,
  };
};

export const toggleSelectedValidator = (validatorNid: string): SelectedValidatorAction => {
  return {
    payload: validatorNid,
    type: SelectedValidatorTypes.toggle,
  };
};

export const selectedValidatorReducer = (
  state: SelectedValidatorState,
  {payload = '', type}: SelectedValidatorAction,
): SelectedValidatorState => {
  switch (type) {
    case SelectedValidatorTypes.toggle: {
      if (payload in state) {
        return omit(state, payload);
      }
      return {
        ...state,
        [payload]: true,
      };
    }
    case SelectedValidatorTypes.clearAll: {
      return {};
    }
    default:
      throw new Error('Invalid SelectedValidatorActionType');
  }
};
