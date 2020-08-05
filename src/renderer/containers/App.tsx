import React, {FC, ReactNode, useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {useDispatch, useSelector} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';

import Connect from '@renderer/containers/Connect';
import Layout from '@renderer/containers/Layout';
import {connect} from '@renderer/dispatchers/app';
import {getActiveBankConfig} from '@renderer/selectors';
import {AppDispatch, RootState} from '@renderer/types/store';

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeBank = useSelector((state: RootState) => state.app.activeBank);
  const activeBankConfig = useSelector(getActiveBankConfig);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (activeBank && !activeBankConfig) {
      const fetchData = async (): Promise<void> => {
        await dispatch(connect(activeBank));
        setLoading(false);
      };
      fetchData();
    }
  }, [activeBank, activeBankConfig, dispatch]);

  const renderComponent = (): ReactNode => {
    if (loading) return null;
    if (!activeBank) return <Connect />;
    return <Layout />;
  };

  return <Router>{renderComponent()}</Router>;
};

export default hot((): JSX.Element => <App />);
