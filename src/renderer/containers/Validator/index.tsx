import React, {FC, ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import {Button} from '@renderer/components/FormElements';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import ValidatorAccounts from '@renderer/containers/Validator/ValidatorAccounts';
import ValidatorBanks from '@renderer/containers/Validator/ValidatorBanks';
import ValidatorOverview from '@renderer/containers/Validator/ValidatorOverview';
import ValidatorValidators from '@renderer/containers/Validator/ValidatorValidators';
import {useAddress} from '@renderer/hooks';
import {getActivePrimaryValidator, getIsActivePrimaryValidator, getIsManagedValidator} from '@renderer/selectors';
import {setManagedValidator, unsetManagedValidator} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {parseAddressData} from '@renderer/utils/address';

import './Validator.scss';

const Validator: FC = () => {
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const {path, url} = useRouteMatch();
  const activePrimaryValidator = useSelector(getActivePrimaryValidator)!;
  const isActivePrimaryValidator = useSelector(getIsActivePrimaryValidator(address));
  const isManagedValidator = useSelector(getIsManagedValidator(address));

  const getDropdownMenuOptions = (): DropdownMenuOption[] => {
    if (!isManagedValidator) return [];
    return [
      {
        label: 'Remove Validator',
        onClick: handleRemoveManagedValidator,
      },
    ];
  };

  const handleAddManagedValidator = (): void => {
    const {ipAddress, port, protocol} = parseAddressData(address);
    dispatch(
      setManagedValidator({
        ip_address: ipAddress,
        nickname: '',
        port,
        protocol,
      }),
    );
  };

  const handleRemoveManagedValidator = (): void => {
    const {ipAddress, port, protocol} = parseAddressData(address);
    dispatch(
      unsetManagedValidator({
        ip_address: ipAddress,
        port,
        protocol,
      }),
    );
  };

  const renderRightPageHeaderButtons = (): ReactNode => {
    if (isActivePrimaryValidator || isManagedValidator) return null;
    return <Button onClick={handleAddManagedValidator}>Add to Managed Validators</Button>;
  };

  const renderTabContent = (): ReactNode => {
    const tabContentRoutes = [
      {
        content: <ValidatorAccounts />,
        page: 'accounts',
      },
      {
        content: <ValidatorBanks />,
        page: 'banks',
      },
      {
        content: <ValidatorOverview />,
        page: 'overview',
      },
      {
        content: <ValidatorValidators />,
        page: 'validators',
      },
    ];

    return (
      <Switch>
        {tabContentRoutes.map(({content, page}) => (
          <Route key={page} path={`${path}/${page}`}>
            {content}
          </Route>
        ))}
      </Switch>
    );
  };

  const renderTitle = (): string => {
    if (isActivePrimaryValidator) return activePrimaryValidator.nickname || activePrimaryValidator.ip_address;
    const {ipAddress} = parseAddressData(address);
    return ipAddress;
  };

  const renderTop = (): ReactNode => (
    <>
      <PageHeader
        dropdownMenuOptions={getDropdownMenuOptions()}
        rightContent={renderRightPageHeaderButtons()}
        title={renderTitle()}
        trustScore={94.21}
      />
      <PageTabs
        baseUrl={url}
        items={[
          {
            name: 'Overview',
            page: 'overview',
          },
          {
            name: 'Accounts',
            page: 'accounts',
          },
          {
            name: 'Banks',
            page: 'banks',
          },
          {
            name: 'Validators',
            page: 'validators',
          },
        ]}
      />
    </>
  );

  return (
    <div className="Validator">
      <PageLayout content={renderTabContent()} top={renderTop()} />
    </div>
  );
};

export default Validator;
