import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { scribbleReducer, initialState } from './reducers/index'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.css';



const history = createBrowserHistory()

const rootReducer = scribbleReducer

const composeEnhancers = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
  <div style={{backgroundColor: '#add8e6', height: '100vh'}}>
    <Router history={history}>
        <App />
    </Router>
  </div>
  </Provider>, document.getElementById('root')

)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
