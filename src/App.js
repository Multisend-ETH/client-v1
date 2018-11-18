import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/home";
import ConnectMetamask from "./pages/connectMetamask";
import Send from "./pages/send";
import Donate from "./pages/donate"

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/connect" component={ConnectMetamask} />
      <Route exact path="/send" component={Send} />
      <Route exact path="/donate" component={Donate} />
    </Switch>
  </Router>
);
