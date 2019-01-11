import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'


const history = createBrowserHistory()

ReactDOM.render(
  <div style={{backgroundColor: '#add8e6', height: '100vh'}}>
  <Router history={history}>
    <App />
  </Router> </div>, document.getElementById('root')

)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
