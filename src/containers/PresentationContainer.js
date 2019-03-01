import React, { Component } from 'react'
import { fetchUser, fetchMeetingRange } from '../adapters/index'
import moment from 'moment'
import Day from '../components/Day'
var concatAll = require('concat-all')


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
      console.log(resp.meeting_range)
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



  mappedMeetingRangeV2 = () => {

    const availableTimes = this.state.meetingRange
        .map((meetingRange, i) => (
          this.state.meetingTimes
            .filter(meetingTime => {
        return meetingTime.day === meetingRange.slice(0, 10)})))


        return concatAll(availableTimes)
          .map((time, i) => {
            return (
              <>
                <div>
                  <Day
                    handleFinalDate={this.handleFinalDate}
                    finalChoice={this.state.finalChoice}
                    creator={this.state.users[0].first_name}
                    joinedUsers={this.state.joinedUsers}
                    canClick={this.state.canClick}
                    meetingTime={time}index={i + 1} day={moment(time.day).format('LL')}
                    interval={this.state.interval}
                  />
                </div>
                <br/>
              </>
            )
          })
  }
  // fetch to create new User
  // fetch to create new meetingTimes associated with User
  // ability to send link through email to people you want to participate

   render() {
     if (this.state.users[0]) {
     return (
       <div className="base-layout-grid">
        <div className="meeting-container-grid">
        <div className="meeting-container-item-header">
          {this.state.users[0].first_name + ' ' + this.state.users[0].last_name}'s Poll
        </div>
        <div style={{fontSize: '50px',
        fontStyle: 'oblique'}} className="presentation-container-header">Scribble
          </div>
          <div className="presentation-day-range">
          {this.mappedMeetingRangeV2()}
          </div>
          </div>
        </div>

     )
   } else {
     return <div>LOADING...</div>
   }
   }
 }
