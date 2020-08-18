import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import loadable from "../util/loadable.js";
// import Popular from './Tab.js';
// import Battle from './Battle.js';

const Popular = loadable(() => import("./Popular.js"));
const Battle = loadable(() => import("./Battle.js"));
const BattleEnd = loadable(() => import("./BattleEnd.js"));

//内容部分
class Content extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect from="/" to="/Popular" />
          </Route>
          <Route path="/Popular" component={Popular}>
          </Route>
          <Route path="/Battle" component={Battle}>
          </Route>
          <Route path="/BattleEnd" component={BattleEnd}>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Content;
