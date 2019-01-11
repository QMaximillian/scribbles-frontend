import React, { Component } from 'react';
import { Switch, Route } from 'react-router'
import HomeContainer from './containers/HomeContainer'
import CreateMeetingContainer from './containers/CreateMeetingContainer'
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
      <Route exact path="/home" render={(props) => < HomeContainer {...props}/>}/>
      <Route exact path="/create" render={(props) => < CreateMeetingContainer {...props}/>}/>
      </Switch>

    )
  }
}

export default App;
