import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import './app.global.css';
import MainPage from './components/Main';

render((
  <Router history={hashHistory}>
    <Route path="/" component={MainPage}/>
  </Router>
), document.getElementById('root'));
