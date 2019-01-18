import React, { Component } from 'react'
import moment from 'moment'
import { fetchCreateMeetingTime } from '../adapters/index'

class Time extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggleOn: false
    }
  }

  componentDidUpdate() {
     if (this.props.fetch && this.state.toggleOn) {
       fetchCreateMeetingTime({
         meeting_time: {
           begin_time: moment(this.props.time).format(),
           end_time: moment(this.props.time).add(this.props.interval, 'minutes').format(),
           affirmative: this.state.toggleOn,
           user_id: this.props.user_id
         }
       })
     }
  }

  handleToggle = () => {
    this.setState({
      toggleOn: !this.state.toggleOn
    }, () => console.log(this.state.toggleOn))
  }

  render() {
    console.log(this.props.user_id)
    if (this.props.canClick) {
    return(
      <div onClick={this.handleToggle}>
      <div style={{backgroundColor: `${this.state.toggleOn ? 'green' : "#add8e6"}`}}>
      <span>
      {moment(this.props.time).format("hh:mm a")} -
      </span>
      <span>
      {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mm a")}
      </span>
      </div>
      </div>
    )
  } else {
    return(
      <div>
      <div style={{backgroundColor: "#add8e6"}}>
      <span>
      {moment(this.props.time).format("hh:mm a")} -
      </span>
      <span>
      {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mm a")}
      </span>
      </div>
      </div>
    )
  }
}}

export default Time
