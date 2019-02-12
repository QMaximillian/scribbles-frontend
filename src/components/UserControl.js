import React, { Component} from 'react'
import Day from './Day'
import { fetchCreateUser } from '../adapters/index'
import User from './User'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'


class UserControl extends Component {
  constructor(props){
    super(props)

    this.state = {
      userCreate: true,
      fetch: false,
      user_id: 0
    }
  }

  displayMeetingTimes = () => {

    return this.props.meetingTimes.map(meetingTime => {
      return <Day userId={this.state.userId} fetch={this.state.fetch} day={meetingTime.day} meetingTimes={this.props.meetingTimes}/>
    })
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
        meeting_range_id: this.props.meetingRangeId,
        email: this.state.email
      }
    }).then(resp => this.setState({userId: resp.id, userCreate: false}, () => console.log(this.state.user_id)))
  }

   render() {
     console.log(this.props)
     if (this.state.userCreate) {
       return (
         <User handleChange={this.handleChange}
         handleUserCreate={this.handleUserCreate}/>
       )
     } else {
      return(
        <div>
          {this.displayMeetingTimes()}
          <div>
          <button onClick={this.handleFetchState}>Submit Times</button>
          </div>
        </div>
      )
  }
}
}

export default withRouter(connect(state => ({meetingRangeId: state.meetingRangeId}))(UserControl))
