import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import 'bootstrap/dist/css/bootstrap.css';


const history = createBrowserHistory()

ReactDOM.render(
  <div style={{backgroundColor: '#add8e6', height: '100vh'}}>
  <Router history={history}>
    <App />
  </Router> </div>, document.getElementById('root')
)
