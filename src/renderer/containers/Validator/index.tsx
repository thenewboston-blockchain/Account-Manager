import React, {FC, ReactNode, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Switch, useParams, useRouteMatch, withRouter} from 'react-router-dom';
import noop from 'lodash/noop';

import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import {Button} from '@renderer/components/FormElements';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import ValidatorAccounts from '@renderer/containers/Validator/ValidatorAccounts';
import ValidatorBanks from '@renderer/containers/Validator/ValidatorBanks';
import ValidatorOverview from '@renderer/containers/Validator/ValidatorOverview';
import ValidatorValidators from '@renderer/containers/Validator/ValidatorValidators';
import {getActivePrimaryValidator, getManagedValidators} from '@renderer/selectors';
import {setManagedValidator} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {getIsActivePrimaryValidator, getIsManagedValidator} from '@renderer/utils/validators';

import './Validator.scss';

const Validator: FC = () => {
  const {ipAddress, port, protocol} = useParams();
  const {path, url} = useRouteMatch();
  const activePrimaryValidator = useSelector(getActivePrimaryValidator)!;
  const dispatch = useDispatch<AppDispatch>();
  const isActivePrimaryValidator = useMemo(
    () => getIsActivePrimaryValidator(activePrimaryValidator, ipAddress, port, protocol),
    [activePrimaryValidator, ipAddress, port, protocol],
  );
  const managedValidators = useSelector(getManagedValidators);
  const isManagedValidator = useMemo(() => getIsManagedValidator(managedValidators, ipAddress, port, protocol), [
    managedValidators,
    ipAddress,
    port,
    protocol,
  ]);

  const dropdownMenuOptions: DropdownMenuOption[] = [
    {
      label: 'Sample',
      onClick: noop,
    },
  ];

  const handleAddManagedValidator = (): void => {
    dispatch(
      setManagedValidator({
        ip_address: ipAddress,
        nickname: '',
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

  const renderTop = (): ReactNode => (
    <>
      <PageHeader
        dropdownMenuOptions={dropdownMenuOptions}
        rightContent={renderRightPageHeaderButtons()}
        title={renderValidatorTitle()}
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

  const renderValidatorTitle = (): string => {
    if (isActivePrimaryValidator) return activePrimaryValidator.nickname || activePrimaryValidator.ip_address;
    return ipAddress;
  };

  return (
    <div className="Validator">
      <PageLayout content={renderTabContent()} top={renderTop()} />
    </div>
  );
};

export default withRouter(Validator);
