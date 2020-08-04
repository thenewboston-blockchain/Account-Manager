import React, {FC, ReactNode, useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {useDispatch, useSelector} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';

import {fetchBankConfig} from '@renderer/api/configs/bankConfigs';
import {fetchValidatorConfig} from '@renderer/api/configs/validatorConfigs';
import Connect from '@renderer/containers/Connect';
import Layout from '@renderer/containers/Layout';
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
        const bankConfigData = await dispatch(fetchBankConfig(activeBank));
        const {primary_validator: primaryValidator} = bankConfigData;
        const primaryValidatorData = {
          ip_address: primaryValidator.ip_address,
          port: primaryValidator.port,
          protocol: primaryValidator.protocol,
        };
        await dispatch(fetchValidatorConfig(primaryValidatorData));

        // Now do I set activePrimaryValidator? What if it doesn't exist? There is no reliability with this flow
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
