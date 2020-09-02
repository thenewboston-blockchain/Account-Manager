import {useCallback, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

const locationKeys: string[] = [];

const useNavigationalHistory = () => {
  const history = useHistory();
  const location = useLocation();
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

  const back = useCallback<() => void>(() => {
    if (backEnabled) {
      history.goBack();
      (document.activeElement as any)?.blur();
    }
  }, [backEnabled, history]);

  const forward = useCallback<() => void>(() => {
    if (forwardEnabled) {
      history.goForward();
      (document.activeElement as any)?.blur();
    }
  }, [forwardEnabled, history]);

  const reload = useCallback(() => {
    const currentLocation = location.pathname;
    history.replace('/reload');
    setTimeout(() => {
      history.replace(currentLocation);
      (document.activeElement as any)?.blur();
    });
  }, [history, location]);

  return {
    back,
    backEnabled,
    forward,
    forwardEnabled,
    reload,
  };
};

export default useNavigationalHistory;
