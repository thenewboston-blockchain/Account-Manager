import React, {FC, ReactNode, useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter as Router} from 'react-router-dom';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Connect from '@renderer/containers/Connect';
import Layout from '@renderer/containers/Layout';
import {connect} from '@renderer/dispatchers/app';
import {getActiveBank, getActiveBankConfig} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';

const App: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const activeBank = useSelector(getActiveBank);
  const activeBankConfig = useSelector(getActiveBankConfig);

  useEffect(() => {
    if (activeBank && !activeBankConfig) {
      setLoading(true);
      const fetchData = async (): Promise<void> => {
        await dispatch(connect(activeBank));
        setLoading(false);
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [activeBank, activeBankConfig, dispatch]);

  const renderComponent = (): ReactNode => {
    if (loading) return null;
    if (!activeBank || !activeBankConfig) return <Connect />;
    return <Layout />;
  };

  return (
    <Router>
      {renderComponent()}
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
        rtl={false}
        transition={Flip}
      />
    </Router>
  );
};

export default hot((): JSX.Element => <App />);
