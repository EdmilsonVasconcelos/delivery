import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Products from './pages/Products';
import Login from './pages/Login';

import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Purchases from './pages/Purchases';
import AddToCart from './pages/AddToCart';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Products />
        </Route>
        <Route exact path="/add-to-cart/:idProduct">
          <AddToCart />
        </Route>
        <Route exact path="/login-admin">
          <Login />
        </Route>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/purchases" component={Purchases} />
      </Switch>
    </Router>
  );
}
