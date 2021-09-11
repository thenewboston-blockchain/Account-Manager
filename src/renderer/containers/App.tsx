import React, {FC, ReactNode, useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter as Router} from 'react-router-dom';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import electronIsDev from 'electron-is-dev';

import {DEFAULT_BANK} from '@renderer/config';
import CreateAccountModal from '@renderer/containers/Account/CreateAccountModal';
import Connect from '@renderer/containers/Connect';
import Layout from '@renderer/containers/Layout';
import {connect, connectAndStoreLocalData, fetchNonDefaultNodeConfigs} from '@renderer/dispatchers/app';
import {useBooleanState, useCrawlSockets, useCleanSockets, useWebSockets} from '@renderer/hooks';
import {getActiveBank, getActiveBankConfig} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeBank = useSelector(getActiveBank);
  const activeBankConfig = useSelector(getActiveBankConfig);
  const [getStartedModalIsOpen, toggleGetStartedModal, openGetStartedModal] = useBooleanState(false);
  const [loading, setLoading] = useState<boolean>(true);
  useCrawlSockets();
  useCleanSockets();
  useWebSockets();

  useEffect(() => {
    dispatch(fetchNonDefaultNodeConfigs());
  }, [dispatch]);

  useEffect(() => {
    if (activeBank && !activeBankConfig) {
      setLoading(true);
      const fetchData = async (): Promise<void> => {
        try {
          await dispatch(connect(activeBank));
        } catch (error) {
          displayToast('An error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else if (!activeBank && !activeBankConfig) {
      setLoading(true);
      const fetchDefaultBankData = async (): Promise<void> => {
        try {
          const response = await dispatch(connectAndStoreLocalData(DEFAULT_BANK, DEFAULT_BANK.ip_address));
          if (response?.error) {
            displayErrorToast(response.error);
            return;
          }
          openGetStartedModal();
        } catch (error) {
          displayToast('An error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchDefaultBankData();
    } else {
      setLoading(false);
    }
  }, [activeBank, activeBankConfig, dispatch, openGetStartedModal]);

  const renderComponent = (): ReactNode => {
    if (loading) return null;
    if (!activeBank || !activeBankConfig) return <Connect />;
    return <Layout />;
  };

  return (
    <Router>
      {renderComponent()}
      <ToastContainer
        autoClose={3000}
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
      {getStartedModalIsOpen && <CreateAccountModal close={toggleGetStartedModal} isGetStartedModal />}
    </Router>
  );
};

export default electronIsDev ? hot((): JSX.Element => <App />) : App;
