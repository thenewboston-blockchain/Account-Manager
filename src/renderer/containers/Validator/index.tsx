import React, {FC, ReactNode} from 'react';
import {Route, Switch, useParams, useRouteMatch, withRouter} from 'react-router-dom';

import Accounts from '@renderer/containers/Validator/Accounts';
import Banks from '@renderer/containers/Validator/Banks';
import {Button} from '@renderer/components/FormElements';
import Overview from '@renderer/containers/Validator/Overview';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import Validators from '@renderer/containers/Validator/Validators';

import './Validator.scss';

const Validator: FC = () => {
  let {nid} = useParams();
  let {path, url} = useRouteMatch();

  const renderRightPageHeaderButtons = (): ReactNode => <Button>Add to Managed Validators</Button>;

  const renderTabContent = () => {
    const tabContentRoutes = [
      {
        content: <Accounts />,
        page: 'accounts',
      },
      {
        content: <Banks />,
        page: 'banks',
      },
      {
        content: <Overview />,
        page: 'overview',
      },
      {
        content: <Validators />,
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
