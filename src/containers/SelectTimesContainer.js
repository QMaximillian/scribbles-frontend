import React, { Component } from 'react'
import { fetchCreateUser, fetchMeetingRange } from '../adapters/index'
import moment from 'moment'
import Day from '../components/Day'
import User from '../components/User'
import { withRouter } from 'react-router-dom'


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
    const { meetingTimes, meetingRange } = this.state
    let dayArray = []
    for (let range in meetingRange) {
      for (let time in meetingTimes) {
        if (meetingRange[range].slice(0, 10) === meetingTimes[time].day.slice(0, 10)) {
          dayArray.push(<Day
            canClick={this.state.canClick}
            user_id={this.state.user_id}
            meetingTime={meetingTimes[time]} day={moment(meetingRange[range]).format('LL')}
            interval={this.state.interval}
            fetch={this.state.fetch}/>
          )
        }
      }
    }
    return dayArray
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
         <div>
         <User handleChange={this.handleChange}
         handleUserCreate={this.handleUserCreate}/>
         </div>
       )
     } else {

     return (
       <div>
        <div>
        <div>
        {this.state.users[0].first_name + ' ' + this.state.users[0].last_name}'s Poll
        </div>
          {this.mappedMeetingRange()}
        </div>
        <button onClick={this.handleFetchState}>{this.state.fetch ? 'Update' : 'Submit'} Times</button>
        {this.state.fetch ? <button onClick={() => this.handleMainPageRedirect()}>All Results</button> : <div></div>}
        </div>
     )
   }
   }
 }

 export default withRouter(SelectTimesContainer)
