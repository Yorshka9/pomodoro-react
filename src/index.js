import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "./App";
import Setup from "./pages/Setup";
import Clock from "./pages/Clock";

ReactDOM.render(
  <Router>
    <div>
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/setup" component={Setup} />
        <Route path="/clock" component={Clock} />
      </main>
    </div>
  </Router>,
  document.getElementById("root")
);
