import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import ViewProductDetails from "./components/ViewProductDetails";
import AddEditProductDetails from "./components/AddEditProductDetails";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/view/:id">
            <ViewProductDetails />
          </Route>
          <Route path="/edit/:id">
            <AddEditProductDetails />
          </Route>
          <Route path="/add">
            <AddEditProductDetails />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
