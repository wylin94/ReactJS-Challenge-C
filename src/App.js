import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <Header />
          <Home />
        </Route>
        <Route path='/calculator'>
          <Header />
          <Calculator />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
