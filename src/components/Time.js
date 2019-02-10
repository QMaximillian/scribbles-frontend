import React, { Component } from 'react'
import moment from 'moment'
import { fetchCreateMeetingTime } from '../adapters/index'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'


class Time extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggleOn: false,
    }
  }



  handleToggle = () => {

    this.setState({
      toggleOn: !this.state.toggleOn
    })

    // if (this.props.handleFinalDate) {
    // this.props.handleFinalDate(moment(this.props.time).format())
  // }

  }

  handleSubmit = () => {
    if (this.state.toggleOn) {
      fetchCreateMeetingTime({
          meeting_time: {
            begin_time: moment(this.props.time).format(),
            end_time: moment(this.props.time).add(this.props.interval, 'minutes').format(),
            user_id: this.props.user_id,
            day: this.props.time.format('YYYY-MM-DD'),
          }
        })
    }
  }

  // mappedMatch = () => {
  //   if (this.props.joinedUsers.length === 0){
  //     return
  //   }
  //
  //   let array = []
  //
  //   this.props.joinedUsers.map(resp => {
  //     return resp.meeting_times.forEach(meetingTime => {
  //       if (moment(meetingTime.begin_time).format() === moment(this.props.time).format()) {
  //
  //         array.push(<span>{this.props.creator === resp.users.first_name ? undefined : resp.users.first_name}</span>)
  //       }
  //     })
  //   })
  //   return array
  // }

  render() {
    return(
      <div
        onClick={this.handleToggle}
        style={{backgroundColor: `${this.state.toggleOn ? 'green' : '#e6e9ec'}`}}>

      {moment(this.props.time).format("hh:mma")} -


      {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mma")}

      </div>

    )
  }
  // else if (this.props.finalChoice) {
  //   // presentation container??!?
  //   return(
  //     <div
  //       className="day-range-item"
  //       onClick={this.handleToggle}
  //       style={{backgroundColor: `${this.state.toggleOn ? 'orange' : '#e6e9ec'}`}}>
  //     <span>
  //     {moment(this.props.time).format("hh:mm a")} -
  //     </span>
  //     <span>
  //     {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mm a")}
  //     </span>
  //     {this.mappedMatch()}
  //     </div>
  //
  //   )
  // } else {
  //   return(
  //     <div style={{backgroundColor: '#e6e9ec'}}>
  //     <span>
  //     {moment(this.props.time).format("hh:mm a")} -
  //     </span>
  //     <span>
  //     {moment(this.props.time).add(this.props.interval, 'minutes').format("hh:mm a")}
  //     </span>
  //     {this.mappedMatch()}
  //     </div>
  //   )
  // }
// }
}

export default withRouter(connect(state => ({state: state.userInformation,interval: state.interval}))(Time))
