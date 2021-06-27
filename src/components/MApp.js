import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  NavLink,
} from "react-router-dom";

import App from "./App";
import Lottery from "./pages/Lottery";
import About from "./pages/About";
import NavBar from "./NavBar";

const MApp = () => {
  return (
    <Router>
      <main>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <About />
          </Route>
          <Route path="/farms" exact>
            <App />
          </Route>
          <Route path="/lottery" exact>
            <Lottery />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default MApp;
