import React, { Component } from 'react'
import { fetchMeetingRange, fetchUpdateMeetingRange, fetchCreateInvitation, fetchUser, fetchCreateUser } from '../adapters/index.js'
import moment from 'moment'
import Day from '../components/Day'
import { Redirect } from 'react-router-dom'
import { getDates } from '../shared/functions'
import  User from '../components/User'

var concatAll = require('concat-all')


export default class BaseFinalContainer extends Component {

  constructor(props) {
    super(props)

  this.state = {
    meetingTimes: [],
    meetingRange: [],
    users: [],
    newUser: '',
    interval: 0,
    email: '',
    canClick: false,
    adminView: false,
    addView: false,
    showView: false,
    finalDate: new Date(),
    user_ids: [],
    joinedUsers: [],
    userCreate: true,
    fetch: false,
    user_id: null,
  }
}

  componentDidMount(){

  fetchMeetingRange(this.props.match.params.id).then(resp => {
    console.log(resp)
    const datesArray = getDates(resp.meeting_range.begin_date, resp.meeting_range.end_date)

    this.setState({
      meetingTimes: resp.meeting_time,
      meetingRange: datesArray,
      users: resp.users,
      user_ids: resp.user_ids,
      interval: resp.meeting_range.interval
    })
  }).then(resp => {
    this.state.user_ids.map(user_id => {
      fetchUser(user_id).then(resp => {
console.log(resp)
        this.setState({
          joinedUsers: [...this.state.joinedUsers, resp]
        }, () => console.log(this.state.joinedUsers))
      })
    })
  })

  const { type } = this.props.match.params
  if (type === 'admin') {
      this.setState({adminView: true})
  } else if (type === 'add') {
      this.setState({addView: true})
  } else {
      this.setState({presentationView: true})
  }

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
                  adminView={this.state.adminView}
                  presentationView={this.state.presentationView}
                  addView={this.state.addView}
                  creator={this.state.users[0].first_name}
                  users={this.state.users}
                  meetingTime={time}
                  index={i + 1} day={moment(time.day).format('LL')}
                  interval={this.state.interval}
                  joinedUsers={this.state.joinedUsers}
                  fetch={this.state.fetch}
                  meetingRangeId={this.props.match.params.id}
                  user_id={this.state.user_id}
                />
              </div>
              <br/>
            </>
          )
        })
}

  handleFinalDate = (date) => {
    this.setState({
      finalDate: date
    })
  }

  handleInvitationFetch = () => {
    fetchCreateInvitation({
      invitation: {
        email: this.state.email,
        link: `localhost:3000/meeting_range/${this.props.match.params.id}/`,
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

  handleUserCreate = () => {
    fetchCreateUser({
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        meeting_range_id: this.props.match.params.id,
        email: this.state.email
      }
    }).then(resp => this.setState({user_id: resp.id}, () => console.log(this.state))).then(resp => this.setState({userCreate: false}))
  }

  handleMainPageRedirect = () => {
    return this.props.history.push('/meeting_range/' + this.props.match.params.id)
  }

  handleFetchState = () => {
    this.setState({
      fetch: true
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    }, () => console.log(this.state))
  }

   render() {

  if (this.props.match.params.type === 'admin' && this.state.users[0]){
     return (
       <div className="base-layout-grid">
        <div className="meeting-container-grid">
        <div className="meeting-container-item-header">
          {this.state.users[0].first_name + ' ' + this.state.users[0].last_name}'s Poll
        </div>
        <div className="meeting-container-item-header2">
        <div style={{fontSize: '50px', fontStyle: 'oblique', textAlign: 'center'}}>Scribble
          </div>
          Choose the date and click "End Poll" to submit
        </div>
        <div className="day-range">
        {this.mappedMeetingRangeV2()}
        </div>
        <div className="meeting-container-add-user">
          <label>
            Add A User
          </label><br />
          <input
            value={this.state.email} onChange={this.handleEmailInput}
            placeholder="Email...">
          </input>
          <button onClick={() => this.handleInvitationFetch()}> Submit
          </button>
        </div>
        <div className="meeting-container-end-poll">
          <button onClick={() => this.handleEndPoll()}> End Poll
          </button>
        </div>
        </div>
      </div>
     )
  } else if (this.props.match.params.type === 'add'){
    if (this.state.userCreate) {
      return (
        <div className="base-layout-grid">
         <div className="meeting-container-grid">
         <div style={{fontSize: '50px',
         fontStyle: 'oblique'}} className="presentation-container-header">Scribble
           </div>
          <User handleChange={this.handleChange}
        handleUserCreate={this.handleUserCreate}/></div>
        </div>
      )
    } else {
      return (
        <div className="base-layout-grid">
         <div className="meeting-container-grid">
         <div className="meeting-container-item-header">
         {this.state.users[0].first_name + ' ' + this.state.users[0].last_name}'s Poll
         </div>
         <div className="meeting-container-item-header2">
         <div style={{fontSize: '50px', fontStyle: 'oblique', textAlign: 'center'}}>Scribble
           </div>
           Pick the dates that work
           </div>
         <div className="day-range">
           {this.mappedMeetingRangeV2()}
         </div>
         {this.state.fetch ? null :
         <button className="meeting-container-end-poll" onClick={this.handleFetchState}>Submit Times</button>}

         {this.state.fetch ? <button className="meeting-container-end-poll" onClick={() => this.handleMainPageRedirect()}>All Results</button> : null}
         </div>
         </div>
      )
  }
} else if ( this.props.match.params.type === undefined && this.state.users[0]){
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
  return <div>LOADING...{console.log(this.props)}</div>
}
}

}
