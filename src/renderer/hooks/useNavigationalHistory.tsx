import {useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import noop from 'lodash/noop';

const useNavigationalHistory = () => {
  const history = useHistory();
  const [backEnabled] = useState(true);
  const [forwardEnabled] = useState(true);

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
