import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <Home />
        </Route>
        <Route path='/calculator'>
          <Calculator />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
