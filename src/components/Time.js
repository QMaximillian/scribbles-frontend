import React, { Component } from 'react'
import moment from 'moment'
import { fetchCreateMeetingTime } from '../adapters/index'
var concatAll = require('concat-all')

class Time extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggleOn: false,
    }
  }

  componentDidUpdate() {
     if (this.props.fetch && this.state.toggleOn)
      {
       fetchCreateMeetingTime({
         meeting_time: {
           begin_time: moment(this.props.time).format(),
           end_time: moment(this.props.time).add(this.props.interval, 'minutes').format(),
           affirmative: this.state.toggleOn,
           user_id: this.props.user_id,
           day: moment(this.props.day).format(),
           meeting_range_id: this.props.meetingRangeId,
         }
       })
     }
  }

  handleToggle = () => {

    this.setState({
      toggleOn: !this.state.toggleOn
    })

    if (this.props.handleFinalDate) {
    this.props.handleFinalDate(moment(this.props.time).format())
  }

  }

  mappedMatch = () => {

    return this.props.joinedUsers.map(resp => (
      resp.meeting_times.map(meetingTime => (
        moment(meetingTime.begin_time).format() === moment(this.props.time).format() ?
            <span>{this.props.creator === resp.users.first_name ? undefined : resp.users.first_name}</span>
              :
            null
          )
      )
    ))
  }

  render() {
console.log(this.props.user_id)
    if (this.props.addView) {
    return(
      <div
        onClick={this.handleToggle}
        style={{backgroundColor: `${this.state.toggleOn ? 'green' : ''}`}}>
      <span>
      {moment(this.props.time).format("hh:mm a")} -
      </span>
      <span>
      {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mm a")}
      </span>
      </div>

    )
  } else if (this.props.adminView) {
    return(
      <div
        onClick={this.handleToggle}
        style={{backgroundColor: `${this.state.toggleOn ? 'orange' : ''}`}}>
      <span>
      {moment(this.props.time).format("hh:mm a")} -
      </span>
      <span>
      {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mm a")}
      </span>
      {this.mappedMatch()}
      </div>

    )
  } else {
    return(
      <div style={{backgroundColor: ''}}>
      <span>
      {moment(this.props.time).format("hh:mm a")} -
      </span>
      <span>
      {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mm a")}
      </span>
      {this.mappedMatch()}
      </div>
    )
  }
}}

export default Time
