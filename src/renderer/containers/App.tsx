import React, {FC, ReactNode, useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter as Router} from 'react-router-dom';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Connect from '@renderer/containers/Connect';
import Layout from '@renderer/containers/Layout';
import {connect} from '@renderer/dispatchers/app';
import {getActiveBank, getActiveBankConfig, getManagedAccounts} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';
import {formatSocketAddress} from '@renderer/utils/address';
import initializeSockets, {handleConfirmationBlockNotification} from '@renderer/utils/sockets';
import {displayErrorToast} from '@renderer/utils/toast';

const App: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const activeBank = useSelector(getActiveBank);
  const activeBankConfig = useSelector(getActiveBankConfig);
  const bankSocketAddress = activeBank ? formatSocketAddress(activeBank.ip_address, activeBank.port) : '';
  const dispatch = useDispatch<AppDispatch>();
  const managedAccounts = useSelector(getManagedAccounts);

  const managedAccountNumbers = Object.values(managedAccounts)
    .map(({account_number}) => account_number)
    .sort()
    .join('-');

  useEffect(() => {
    if (!bankSocketAddress) return;
    const accountNumbers = managedAccountNumbers.split('-');
    const sockets = initializeSockets(accountNumbers, bankSocketAddress);

    sockets.forEach((socket: any) => {
      socket.onmessage = (event: any) => {
        try {
          const notification = JSON.parse(event.data);
          if (notification.notification_type === 'CONFIRMATION_BLOCK_NOTIFICATION') {
            handleConfirmationBlockNotification(accountNumbers, dispatch, notification);
          }
        } catch (error) {
          displayErrorToast(error);
        }
      };
    });

    return () => {
      sockets.forEach((socket: any) => socket.close());
    };
  }, [bankSocketAddress, dispatch, managedAccountNumbers]);

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
    </Router>
  );
};

export default hot((): JSX.Element => <App />);
