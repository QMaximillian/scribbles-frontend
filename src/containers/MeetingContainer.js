import React, { Component } from 'react'
import { fetchMeetingRange } from '../adapters/index.js'
import moment from 'moment'
import Day from '../components/Day'

export default class MeetingContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      meetingTimes: [],
      meetingRange: [],
      users: [],
    }

  }

  componentDidMount() {
    fetchMeetingRange(this.props.match.params.id).then(resp => {

      const datesArray = this.getDates(resp.meeting_range.begin_date, resp.meeting_range.end_date)

      this.setState({
        meetingTimes: resp.meeting_time,
        meetingRange: datesArray,
        users: resp.users,
      })
    })
  }

  mappedMeetingRange = () => {
    // Something other than map that doesn't return values if they do not match
    return this.state.meetingRange.map(meetingRange => {
      return this.state.meetingTimes.map(meetingTime => {
        if (meetingTime.day.toString() === meetingRange.slice(0, 10)) {
        return (
          <Day
            meetingTime={meetingTime} day={moment(meetingRange).format('LL')}/>
          )
        }
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

  // fetch to create new User
  // fetch to create new meetingTimes associated with User
  // ability to send link through email to people you want to participate
   
   render() {
     if (this.state.meetingRange[0] && this.state.meetingTimes[0]) {
     console.log(this.state.meetingTimes[0].day.toString())
     console.log(this.state.meetingRange[0].slice(0, 10))
   }
     return (
        <div>
          {this.mappedMeetingRange()}
        </div>
     )
   }
 }
