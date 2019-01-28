  import React, { Component } from 'react';
import { Switch, Route } from 'react-router'
import HomeContainer from './containers/HomeContainer'
import CreateRangeContainer from './containers/CreateRangeContainer'
import CreateTimesContainer from './containers/CreateTimesContainer'
import MeetingContainer from './containers/MeetingContainer'
import SelectTimesContainer from './containers/SelectTimesContainer'
import PresentationContainer from './containers/PresentationContainer'
import ConfirmedDate from './components/ConfirmedDate'
import './App.css';

class App extends Component {
  render() {
    return (

      <Switch>
      <Route exact path="/home" render={(props) => < HomeContainer {...props}/>}/>
      <Route exact path="/meeting_range/create/range" render={(props) => <CreateRangeContainer {...props}/>}/>
      <Route exact path="/meeting_range/create/times" render={(props) => <CreateTimesContainer {...props}/>}/>
      <Route exact path="/meeting_range/:id" render={(props) => <PresentationContainer {...props}/>}/>
      <Route exact path="/meeting_range/:id/admin" render={(props) => <MeetingContainer {...props}/>}/>
      <Route exact path="/meeting_range/:id/add" render={(props) => <SelectTimesContainer {...props}/>}/>
      <Route exact path="/meeting_range/:id/confirmed" render={(props) => <ConfirmedDate {...props}/>}/>
      </Switch>

    )
  }
}

export default App;
