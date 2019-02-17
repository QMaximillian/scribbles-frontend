import React, { Component } from 'react'
import { fetchMeetingRange, fetchUpdateMeetingRange, fetchCreateInvitation, fetchUser } from '../adapters/index.js'
import moment from 'moment'
import Day from '../components/Day'
import { Redirect } from 'react-router-dom'
var concatAll = require('concat-all')


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

      const datesArray = this.getDates(resp.meeting_range.begin_date, resp.meeting_range.end_date)

      console.log(resp)

      // let meetingTimeConvert = resp.meeting_time.map(meetingTime => {
      //   return moment(meetingTime.day).format()
      // })
      //
      // console.log(meetingTimeConvert)

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


  // mappedMeetingRange = () => {
  //   Something other than map that doesn't return values if they do not match
  //   return this.state.meetingRange.map((meetingRange, i) => {
  //     return this.state.meetingTimes.map(meetingTime => {
  //       if (meetingTime.day === meetingRange.slice(0, 10)) {
  //       return (
  //         <>
  //         <div>
  //         <Day
  //           handleFinalDate={this.handleFinalDate}
  //           finalChoice={this.state.finalChoice}
  //           creator={this.state.users[0].first_name}
  //           joinedUsers={this.state.joinedUsers}
  //           canClick={this.state.canClick}
  //           meetingTime={meetingTime}index={i + 1} day={moment(meetingRange).format('LL')}
  //           interval={this.state.interval}/>
  //           </div>
  //           <br/>
  //           </>
  //         )
  //
  //       }
  //     })
  //   })
  // }

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
                    finalChoice={this.state.finalChoice}
                    creator={this.state.users[0].first_name}
                    joinedUsers={this.state.joinedUsers}
                    canClick={this.state.canClick}
                    meetingTime={time}index={i + 1} day={moment(time.day).format('LL')}
                    interval={this.state.interval}
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



  // fetch to create new User
  // fetch to create new meetingTimes associated with User
  // ability to send link through email to people you want to participate

   render() {
     if (this.state.redirect) {
       return <Redirect exact to={{ pathname: `/meeting_range/${this.props.match.params.id}/confirmed`, state: { finalDate: this.state.finalDate, interval: this.state.interval } }}/>
     }

     if (this.state.user_ids[0]) {
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
   } else {
     return <div>{this.mappedMeetingRangeV2()}</div>
   }
   }
 }
