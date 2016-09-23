import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';

import Intro from './Intro';
import Pin from './Pin';
import Withdraw from './Withdraw'
import Delivery from './Delivery';
import CashIn from './CashIn';
import Abort from './Abort';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" component={Intro}/>
      <Route path="/pin" component={Pin}/>
      <Route path="/withdraw" component={Withdraw}/>
      <Route path="/delivery" component={Delivery}/>
      <Route path="/cashin" component={CashIn}/>
      <Route path="/abort" component={Abort}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
