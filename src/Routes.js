import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from './components/Login/Login.js';
import Main from './components/Main/Main.js';

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/">
            <Login />
        </Route>
        <Route path="/main/">
            <Main />
        </Route>
    </Switch>
  );
}
