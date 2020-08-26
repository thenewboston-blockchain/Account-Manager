import {useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import noop from 'lodash/noop';

const locationKeys: string[] = [];

const useNavigationalHistory = () => {
  const history = useHistory();
  const [backEnabled, setBackEnabled] = useState(false);
  const [forwardEnabled, setForwardEnabled] = useState(false);

  history.listen(({key}) => {
    if (key === undefined) return;

    // User visiting a new location
    if (!locationKeys.includes(key)) {
      locationKeys.push(key);

      if (locationKeys.length > 1) {
        setBackEnabled(true);
      }

      setForwardEnabled(false);
      return;
    }

    // User re-visiting first location in history
    if (key === locationKeys[0]) {
      setBackEnabled(false);
      return;
    }

    // User came back to last location after navigating through earlier history
    if (key === locationKeys[locationKeys.length - 1]) {
      setForwardEnabled(false);
      return;
    }

    // User is navigating through history (but not at first or last)
    setBackEnabled(true);
    setForwardEnabled(true);
  });

  const back = useMemo<() => void>(() => (backEnabled ? history.goBack : noop), [backEnabled, history]);
  const forward = useMemo<() => void>(() => (forwardEnabled ? history.goForward : noop), [forwardEnabled, history]);

  return {
    back,
    backEnabled,
    forward,
    forwardEnabled,
  };
};

export default useNavigationalHistory;
