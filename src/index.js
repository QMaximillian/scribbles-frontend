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
import { loadState, saveState } from './localStorage'


const history = createBrowserHistory()

const rootReducer = scribbleReducer

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState()
export const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => {
  saveState(store.getState())
})


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <App />
    </Router>
  </Provider>, document.getElementById('root')
)
