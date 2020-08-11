import React, {FC, ReactNode} from 'react';
import {Route, Switch, useRouteMatch, withRouter} from 'react-router-dom';

import {Button} from '@renderer/components/FormElements';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import ValidatorAccounts from '@renderer/containers/Validator/ValidatorAccounts';
import ValidatorBanks from '@renderer/containers/Validator/ValidatorBanks';
import ValidatorOverview from '@renderer/containers/Validator/ValidatorOverview';
import ValidatorValidators from '@renderer/containers/Validator/ValidatorValidators';

import './Validator.scss';

const Validator: FC = () => {
  const {path, url} = useRouteMatch();
  const validator = null as any;

  const renderRightPageHeaderButtons = (): ReactNode => <Button>Add to Managed Validators</Button>;

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
          <Route path={`${path}/${page}`}>{content}</Route>
        ))}
      </Switch>
    );
  };

  const renderTop = (): ReactNode => (
    <>
      <PageHeader
        rightContent={renderRightPageHeaderButtons()}
        title={`VALIDATOR NAME HERE (${validator.ip_address})`}
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

export default withRouter(Validator);
