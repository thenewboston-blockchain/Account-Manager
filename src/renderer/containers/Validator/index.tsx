import React, {FC, ReactNode} from 'react';
import {Route, Switch, useParams, useRouteMatch, withRouter} from 'react-router-dom';

import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import ValidatorAccounts from '@renderer/containers/Validator/ValidatorAccounts';
import ValidatorBanks from '@renderer/containers/Validator/ValidatorBanks';
import ValidatorOverview from '@renderer/containers/Validator/ValidatorOverview';
import ValidatorValidators from '@renderer/containers/Validator/ValidatorValidators';
import {Button} from '@renderer/components/FormElements';

import './Validator.scss';

const Validator: FC = () => {
  let {nid} = useParams();
  let {path, url} = useRouteMatch();

  const renderRightPageHeaderButtons = (): ReactNode => <Button>Add to Managed Validators</Button>;

  const renderTabContent = () => {
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
        title={`Awesome Validator (${nid})`}
        trustScore={94.21}
      />
      <PageTabs
        items={[
          {
            baseUrl: url,
            name: 'Overview',
            page: 'overview',
          },
          {
            baseUrl: url,
            name: 'Accounts',
            page: 'accounts',
          },
          {
            baseUrl: url,
            name: 'Banks',
            page: 'banks',
          },
          {
            baseUrl: url,
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
