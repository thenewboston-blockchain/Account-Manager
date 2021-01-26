import omit from 'lodash/omit';

export type SelectedValidatorState = {
  [nodeIdentifier: string]: number;
};

enum SelectedValidatorTypes {
  clearAll = 'clearAll',
  toggle = 'toggle',
}

interface SelectedValidatorPayload {
  index: number;
  nodeIdentifier: string;
}

export interface SelectedValidatorAction {
  type: SelectedValidatorTypes;
  payload?: SelectedValidatorPayload;
}

export const clearSelectedValidator = (): SelectedValidatorAction => {
  return {
    type: SelectedValidatorTypes.clearAll,
  };
};

export const toggleSelectedValidator = (payload: SelectedValidatorPayload): SelectedValidatorAction => {
  return {
    payload,
    type: SelectedValidatorTypes.toggle,
  };
};

export const selectedValidatorReducer = (
  state: SelectedValidatorState,
  {payload = {index: -1, nodeIdentifier: ''}, type}: SelectedValidatorAction,
): SelectedValidatorState => {
  const {index, nodeIdentifier} = payload;

  switch (type) {
    case SelectedValidatorTypes.toggle: {
      if (nodeIdentifier in state) {
        return omit(state, nodeIdentifier);
      }
      return {
        ...state,
        [nodeIdentifier]: index,
      };
    }
    case SelectedValidatorTypes.clearAll: {
      return {};
    }
    default:
      throw new Error('Invalid SelectedValidatorActionType');
  }
};
