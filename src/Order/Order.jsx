import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { NewOrder } from './NewOrder';
import { ReceiveOrder } from './ReceiveOrder';
import { OrderHistory } from './OrderHistory';

export const Order = ({ match }) => {
  return (
    <Switch>
      <Route path={match.url + '/'} exact component={Dashboard} />
      <Route path={match.url + '/new'} component={NewOrder} />
      <Route path={match.url + '/receive'} component={ReceiveOrder} />
      <Route path={match.url + '/history'} component={OrderHistory} />
    </Switch>
  );
};
