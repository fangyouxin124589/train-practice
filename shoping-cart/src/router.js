import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Example from './routes/Example';
import Shopping from './routes/Shopping'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Shopping} />
        <Route path="/ShoppingCart" exact component={Shopping} />
        <Route path="/example" exact component={Example} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
