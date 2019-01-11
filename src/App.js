import React, { Component } from 'react';
import { Switch, Route } from 'react-router'
import HomeContainer from './containers/HomeContainer'
import CreateRangeContainer from './containers/CreateRangeContainer'
import './App.css';

class App extends Component {
  render() {
    return (
      
      <Switch>
      <Route exact path="/home" render={(props) => < HomeContainer {...props}/>}/>
      <Route exact path="/create/range" render={(props) => <CreateRangeContainer {...props}/>}/>
      </Switch>

    )
  }
}

export default App;
