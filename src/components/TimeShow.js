import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { fetchCreateMeetingTime } from '../adapters/index'

class TimeShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggle: false
    }
  }

  componentDidUpdate() {
    if (this.props.fetch && this.state.toggle) {
      fetchCreateMeetingTime({
          meeting_time: {
            meeting_range_id: this.props.meetingRangeId,
            begin_time: moment(this.props.time.begin_time).format(),
            end_time: moment(this.props.time.end_time).format(),
            user_id: this.props.userId,
            day: moment(this.props.time).format('YYYY-MM-DD'),
          }
        })
    }
  }

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }


   render() {
     return (
        <div onClick={this.handleToggle} style={{backgroundColor: `${this.props.userType === 'show' ? null : this.props.userType === 'admin' ? this.state.toggle ? 'orange': 'white' : this.state.toggle ? 'green' : 'white'}`}}>
          {moment(this.props.time.begin_time).format('h:mm a')} -
          {moment(this.props.time.end_time).format('h:mm a')}
        </div>

     )
   }
 }

 export default withRouter(connect(state => ({userType: state.userType, meetingRangeId: state.meetingRangeId}))(TimeShow))
