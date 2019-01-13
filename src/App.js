import React, { Component } from 'react';
import { Switch, Route } from 'react-router'
import HomeContainer from './containers/HomeContainer'
import CreateRangeContainer from './containers/CreateRangeContainer'
import CreateTimesContainer from './containers/CreateTimesContainer'
import MeetingContainer from './containers/MeetingContainer'
import './App.css';

class App extends Component {
  render() {
    return (

      <Switch>
      <Route exact path="/home" render={(props) => < HomeContainer {...props}/>}/>
      <Route exact path="/meeting_range/create/range" render={(props) => <CreateRangeContainer {...props}/>}/>
      <Route exact path="/meeting_range/create/times" render={(props) => <CreateTimesContainer {...props}/>}/>
      <Route exact path="/meeting_range/:id" render={(props) => <MeetingContainer {...props}/>}/>

      </Switch>

    )
  }
}

export default App;
