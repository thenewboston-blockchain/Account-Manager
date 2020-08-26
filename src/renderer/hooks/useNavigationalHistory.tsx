import {useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import noop from 'lodash/noop';

const locationKeys: string[] = [];
let previousKey: string;

const useNavigationalHistory = () => {
  const history = useHistory();
  const [goBackIsDisabled, setGoBackIsDisabled] = useState(true);
  const [goForwardIsDisabled, setGoForwardIsDisabled] = useState(true);

  history.listen(({key}) => {
    if (key === undefined) return;

    if (!locationKeys.includes(key)) {
      // push
      locationKeys.push(key);
      setGoBackIsDisabled(false);
      setGoForwardIsDisabled(true);
    } else if (previousKey && locationKeys.indexOf(key) < locationKeys.indexOf(previousKey)) {
      // goBack
      setGoForwardIsDisabled(false);
      if (locationKeys[0] === key) {
        setGoBackIsDisabled(true);
      }
    } else if (key === locationKeys[locationKeys.length - 1]) {
      // goForward to the latest page
      setGoForwardIsDisabled(true);
    }

    previousKey = key;
  });

  const goBack = useMemo<() => void>(() => (goBackIsDisabled ? noop : history.goBack), [goBackIsDisabled, history]);
  const goForward = useMemo<() => void>(() => (goForwardIsDisabled ? noop : history.goForward), [
    goForwardIsDisabled,
    history,
  ]);

  return {
    goBack,
    goBackIsDisabled,
    goForward,
    goForwardIsDisabled,
  };
};

export default useNavigationalHistory;
