import React from "react";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  NavLink,
  HashRouter,
} from "react-router-dom";

import Home from "./App";
import Lottery from "./pages/Lottery";
import About from "./pages/About";
import NavBar from "./NavBar";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <main>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <About />
            </Route>
            <Route path="/farms" exact>
              <Home />
            </Route>
            <Route path="/lottery" exact>
              <Lottery />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </HashRouter>
    );
  }
}

export default App;
