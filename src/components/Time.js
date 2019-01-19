import React, { Component } from 'react'
import moment from 'moment'
import { fetchCreateMeetingTime } from '../adapters/index'

class Time extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggleOn: false,
    }
  }

  componentDidUpdate() {
     if (this.props.fetch && this.state.toggleOn) {
       fetchCreateMeetingTime({
         meeting_time: {
           begin_time: moment(this.props.time).format(),
           end_time: moment(this.props.time).add(this.props.interval, 'minutes').format(),
           affirmative: this.state.toggleOn,
           user_id: this.props.user_id,
           day: moment(this.props.day).format(),
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
    console.log(moment(this.props.time).format())
  }

  }

  mappedMatch = () => {

    return this.props.joinedUsers.map(resp => {
      return resp.meeting_times.map(meetingTime => {
        if (moment(meetingTime.begin_time).format() === moment(this.props.time).format()) {

          return (<span>{this.props.creator === resp.users.first_name ? undefined : resp.users.first_name}</span>)
        }
      })
    })
  }

  render() {

    if (this.props.canClick) {
    return(
      <div onClick={this.handleToggle}>
      <div style={{backgroundColor: `${this.state.toggleOn ? 'green' : '#e6e9ec'}`}}>
      <span>
      {moment(this.props.time).format("hh:mm a")} -
      </span>
      <span>
      {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mm a")}
      </span>
      </div>
      </div>
    )
  } else if (this.props.finalChoice) {
    return(
      <div onClick={this.handleToggle}>
      <div style={{backgroundColor: `${this.state.toggleOn ? 'orange' : '#e6e9ec'}`}}>
      <span>
      {moment(this.props.time).format("hh:mm a")} -
      </span>
      <span>
      {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mm a")}
      </span>
      {this.mappedMatch()}
      </div>
      </div>
    )
  } else {
    return(
      <div>
      <div style={{backgroundColor: '#e6e9ec'}}>
      <span>
      {moment(this.props.time).format("hh:mm a")} -
      </span>
      <span>
      {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mm a")}
      </span>
      {this.mappedMatch()}
      </div>
      </div>
    )
  }
}}

export default Time
