  import React, { Component } from 'react';
import { Route, Switch } from 'react-router'
import HomeContainer from './containers/HomeContainer'
import CreateRangeContainer from './containers/CreateRangeContainer'
import CreateMeetingTimesContainer from './containers/CreateMeetingTimesContainer'
import CreateTimesContainer from './containers/CreateTimesContainer'
import FinalContainer from './containers/FinalContainer'
// import MeetingContainer from './containers/MeetingContainer'
import HomeDateRangeContainer from './containers/HomeDateRangeContainer'
// import SelectTimesContainer from './containers/SelectTimesContainer'
// import PresentationContainer from './containers/PresentationContainer'
import ConfirmedDate from './components/ConfirmedDate'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Switch>
      <Route path="/home" render={(props) => <HomeDateRangeContainer/>}/>
      <Route path="/create/user" render={(props) => <HomeContainer {...props}/>}/>
      <Route exact path="/create/meeting_range" render={(props) => <CreateMeetingTimesContainer {...props}/>}/>
      <Route exact path="/create/meeting_times" render={(props) => <CreateRangeContainer {...props}/>}/>
      <Route exact path="/meeting_range/:id" render={(props) => <FinalContainer {...props}/>}/>
      <Route exact path="/meeting_range/:id/:user_type" render={(props) => <FinalContainer {...props}/>}/>
      <Route exact path="/meeting_range/:id/add" render={(props) => <FinalContainer {...props}/>}/>
      <Route exact path="/meeting_range/:id/confirmed" render={(props) => <ConfirmedDate {...props}/>}/>
      </Switch>
      </div>

    )
  }
}

export default App;
