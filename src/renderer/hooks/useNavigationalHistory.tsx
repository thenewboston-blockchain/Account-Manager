import {useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import noop from 'lodash/noop';

const locationKeys: string[] = [];
let previousKey: string;

const useNavigationalHistory = () => {
  const history = useHistory();
  const [backEnabled, setBackEnabled] = useState(false);
  const [forwardEnabled, setForwardEnabled] = useState(false);

  history.listen(({key}) => {
    if (key === undefined) return;

    if (!locationKeys.includes(key)) {
      locationKeys.push(key);
      if (locationKeys.length > 1) {
        setBackEnabled(true);
      }
      setForwardEnabled(false);
    } else if (previousKey && locationKeys.indexOf(key) < locationKeys.indexOf(previousKey)) {
      setForwardEnabled(true);
      if (locationKeys[0] === key) {
        setBackEnabled(false);
      }
    } else if (key === locationKeys[locationKeys.length - 1]) {
      setForwardEnabled(false);
    }

    previousKey = key;
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
