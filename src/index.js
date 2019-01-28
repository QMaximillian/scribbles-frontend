import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { rangeFormUserReducer, initialState } from './reducers/index'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.css';
import { reducer as formReducer } from 'redux-form'


const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  form: formReducer, rangeFormUserReducer: rangeFormUserReducer
})

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
