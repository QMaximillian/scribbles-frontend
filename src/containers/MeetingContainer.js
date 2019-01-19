import React, { Component } from 'react'
import { fetchCreateEndPoll, fetchMeetingRange, fetchUpdateMeetingRange, fetchCreateInvitation, fetchUser } from '../adapters/index.js'
import moment from 'moment'
import Day from '../components/Day'
import { Redirect } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

export default class MeetingContainer extends Component {

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
      finalChoice: true,
      finalDate: new Date(),
    }

  }

  componentDidMount() {
    fetchMeetingRange(this.props.match.params.id).then(resp => {
      console.log(resp)
      const datesArray = this.getDates(resp.meeting_range.begin_date, resp.meeting_range.end_date)

      let meetingTimeConvert = resp.meeting_time.map(meetingTime => {
        return moment(meetingTime.day).format()
      })

      console.log(meetingTimeConvert)

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

  mappedMeetingRange = () => {
    // Something other than map that doesn't return values if they do not match
    return this.state.meetingRange.map(meetingRange => {
      return this.state.meetingTimes.map(meetingTime => {
        if (meetingTime.day === meetingRange.slice(0, 10)) {
          console.log(meetingTime)
        return (
          <Day
            handleFinalDate={this.handleFinalDate}
            finalChoice={this.state.finalChoice}
            creator={this.state.users[0].first_name}
            joinedUsers={this.state.joinedUsers}
            canClick={this.state.canClick}
            meetingTime={meetingTime} day={moment(meetingRange).format('LL')}
            interval={this.state.interval}/>
          )
        }
      })
    })
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



  // fetch to create new User
  // fetch to create new meetingTimes associated with User
  // ability to send link through email to people you want to participate

   render() {
     console.log(this.state.meetingRange)
     console.log(this.state.meetingTimes);
     if (this.state.redirect) {
       return <Redirect exact to={{ pathname: `/meeting_range/${this.props.match.params.id}/confirmed`, state: { finalDate: this.state.finalDate, interval: this.state.interval } }}/>
     }

     if (this.state.user_ids[0]) {
     return (
       <Jumbotron>
        <div>
          {this.state.users[0].first_name + ' ' + this.state.users[0].last_name}'s Poll
          <div style={{textAlign: 'center'}}>
            Choose the date and click "End Poll" to submit
          </div>
          <br/>
          {this.mappedMeetingRange()}
        </div>
        <div>
          <div>

          </div>
          <input
          value={this.state.email} onChange={this.handleEmailInput}></input>
          <button onClick={() => this.handleInvitationFetch()}> Add User
          </button>
          <button onClick={() => this.handleEndPoll()}> End Poll
          </button>
        </div>
        <div>

        </div>
      </Jumbotron>
     )
   } else {
     return <div>{this.mappedMeetingRange()}</div>
   }
   }
 }
