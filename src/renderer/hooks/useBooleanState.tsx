import React, {useState} from 'react';

const useBooleanState = (initialValue: boolean): [boolean, () => void, () => void, () => void] => {
  const [state, setState] = useState(initialValue);

  const setFalse = (): void => {
    if (state) setState(false);
  };

  const setTrue = (): void => {
    if (!state) setState(true);
  };

  const toggleState = (): void => {
    setState(!state);
  };

  return [state, toggleState, setTrue, setFalse];
};

export default useBooleanState;
