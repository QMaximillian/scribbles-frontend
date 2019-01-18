import React, { Component } from 'react'
import { fetchUser, fetchMeetingRange } from '../adapters/index'
import moment from 'moment'
import Day from '../components/Day'

export default class PresentationContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meetingTimes: [],
      meetingRange: [],
      user_ids: [],
      users: [],
      newUser: '',
      interval: 0,
      email: '',
      canClick: false,
      joinedUsers: [],

    }

  }

  componentDidMount() {
    fetchMeetingRange(this.props.match.params.id).then(resp => {
      console.log(resp)
      const datesArray = this.getDates(resp.meeting_range.begin_date, resp.meeting_range.end_date)

      this.setState({
        meetingTimes: resp.meeting_time,
        meetingRange: datesArray,
        user_ids: resp.user_ids,
        users: resp.users,
        interval: resp.meeting_range.interval
      })
    })
    .then(resp => {
      this.state.user_ids.forEach(user_id => {
        fetchUser(user_id).then(resp => {
          this.setState({
            joinedUsers: [...this.state.joinedUsers, resp]
          }, () => console.log(this.state.joinedUsers))
        })
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
            meetingTime={meetingTime} day={moment(meetingRange).format('LL')}
            interval={this.state.interval}/>
          )
        }
      })
    })
  }

  mappedJoinedUsers = () => {
    return this.state.joinedUsers.map(user => {
      return (<div>
                {user.users.first_name}
              </div>)
    })
  }


  // fetch to create new User
  // fetch to create new meetingTimes associated with User
  // ability to send link through email to people you want to participate

   render() {
     console.log(this.state)
     if (this.state.users[0]) {
     return (
       <>
        <div>
          {this.state.users[0].first_name}
          <br/>
          {this.mappedMeetingRange()}
        </div>
        <div>
          {this.mappedJoinedUsers()}
        </div>
      </>
     )
   } else {
     return <div>LOADING...</div>
   }
   }
 }