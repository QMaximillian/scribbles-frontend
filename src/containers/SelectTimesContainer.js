import React, { Component } from 'react'
import { fetchCreateUser, fetchMeetingRange } from '../adapters/index'
import moment from 'moment'
import Day from '../components/Day'
import User from '../components/User'
import { withRouter } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

class SelectTimesContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      meetingTimes: [],
      meetingRange: [],
      firstName: '',
      lastName: '',
      email: '',
      interval: 0,
      fetch: false,
      userCreate: true,
      user_id: 0,
      canClick: true
    }

  }

  componentDidMount() {
    fetchMeetingRange(this.props.match.params.id).then(resp => {

      const datesArray = this.getDates(resp.meeting_range.begin_date, resp.meeting_range.end_date)

      this.setState({
        meetingTimes: resp.meeting_time,
        meetingRange: datesArray,
        users: resp.users,
        interval: resp.meeting_range.interval
      })
    })
  }

  getDates = (startDate, stopDate) => {
    let dateArray = [];
    let currentDate = moment(startDate);
    let endDate = moment(stopDate);
    while (currentDate <= endDate) {
        dateArray.push(moment(currentDate).format())
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  mappedMeetingRange = () => {
    // Something other than map that doesn't return values if they do not match
    return this.state.meetingRange.map(meetingRange => {
      return this.state.meetingTimes.map(meetingTime => {
        if (meetingTime.day.toString() === meetingRange.slice(0, 10)) {
        return (
          <Day
            canClick={this.state.canClick}
            user_id={this.state.user_id}
            meetingTime={meetingTime} day={moment(meetingRange).format('LL')}
            interval={this.state.interval}
            fetch={this.state.fetch}/>
          )
        }
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    }, () => console.log(this.state))
  }

  handleFetchState = () => {
    this.setState({
      fetch: true
    })
  }

  handleMainPageRedirect = () => {
    return this.props.history.push('/meeting_range/' + this.props.match.params.id)
  }

  handleUserCreate = () => {
    fetchCreateUser({
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        meeting_range_id: this.props.match.params.id,
        email: this.state.email
      }
    }).then(resp => this.setState({user_id: resp.id, userCreate: false}))
  }

   render() {
     console.log(this.props)
     if (this.state.userCreate) {
       return (
         <Jumbotron>
         <User handleChange={this.handleChange}
         handleUserCreate={this.handleUserCreate}/>
         </Jumbotron>
       )
     } else {

     return (
       <Jumbotron>
        <div>
        <div>
        {this.state.users[0].first_name + ' ' + this.state.users[0].last_name}'s Poll
        </div>
          {this.mappedMeetingRange()}
        </div>
        <button onClick={this.handleFetchState}>{this.state.fetch ? 'Update' : 'Submit'} Times</button>
        {this.state.fetch ? <button onClick={() => this.handleMainPageRedirect()}>All Results</button> : <div></div>}
        </Jumbotron>
     )
   }
   }
 }

 export default withRouter(SelectTimesContainer)
