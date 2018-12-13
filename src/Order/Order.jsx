import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { NewOrder } from './NewOrder';
import { ReceiveOrder } from './ReceiveOrder';
import { OrderHistory } from './OrderHistory';
import { Test } from './Test';
import { Test2 } from './Test2';
import { Vivian } from './Vivian';
import { Todo } from '../Todo/Todo';

export const Order = ({ match }) => {
  return (
    <Switch>
      <Route path={match.url + '/'} exact component={Dashboard} />
      <Route path={match.url + '/new'} component={NewOrder} />
      <Route path={match.url + '/receive'} component={ReceiveOrder} />
      <Route path={match.url + '/history'} component={OrderHistory} />
      <Route path={match.url + '/test'} component={Test} />
      <Route path={match.url + '/test2'} component={Test2} />
      <Route path={match.url + '/vivian'} component={Vivian} />
      <Route path={match.url + '/todo'} component={Todo} />
    </Switch>
  );
};
