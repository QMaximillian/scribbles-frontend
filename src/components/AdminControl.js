import React, { Component } from 'react'
import Day from './Day'
import { setUserType } from '../actions/index'
import { fetchCreateInvitation, fetchUpdateMeetingRange } from '../adapters/index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import moment from 'moment'

class AdminControl extends Component  {
  constructor(props){
    super(props)

    this.state = {
      finalDate: new Date(),
      email: ''
    }
  }

  handleFinalDate = (date) => {
    this.setState({
      finalDate: date
    }, () => console.log(this.state.finalDate))
  }


  handleInvitationFetch = () => {
    fetchCreateInvitation({
      invitation: {
        email: this.state.email,
        link: `localhost:3000/meeting_range/${this.props.meetingRangeId}/user`,
      }
    }).then(resp => {
      this.setState({
        email: ''
      }, () => alert("Invitation Sent"))
    })


  }

  handleEmailInput = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleEndPoll = () => {
    fetchUpdateMeetingRange(this.props.match.params.id, {meeting_range: {final_time: this.state.finalDate}}).then(resp => {
      this.setState({
        redirect: true
      })
    })

  }


  displayMeetingTimes = () => {

    const sortedMeetingTimes = [...this.props.meetingTimes].sort((a, b) => moment(a.day).format('YYYYMMDD') - moment(b.day).format('YYYYMMDD'))

    console.log(sortedMeetingTimes)
    return sortedMeetingTimes.map(meetingTime => {

      if (meetingTime.user_id === this.props.userInformation.user_id) {
        console.log(this.props.meetingTimes)
      return <Day day={meetingTime.day} meetingTimes={this.props.meetingTimes}/>
    }
    })
  }

  render(){
    console.log(this.props)
    return(
      <div>
        <div>
          {this.props.setupDatesAndTimes}
        </div>
        <div>
          <input onChange={this.handleEmailInput} value={this.state.email}>
          </input>
          <button onClick={this.handleInvitationFetch}>
          Add User
          </button>
          <button onClick={this.handleEndPoll}>
          End Poll
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(state => ({meetingRangeId: state.meetingRangeId, userInformation: state.userInformation}))(AdminControl))
