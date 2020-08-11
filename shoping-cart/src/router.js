import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Example from './routes/Example';
import ShoppingCart from './routes/ShoppingCart'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={ShoppingCart} />
        <Route path="/ShoppingCart" exact component={ShoppingCart} />
        <Route path="/example" exact component={Example} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
