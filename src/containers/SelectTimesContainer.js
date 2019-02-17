import React, { Component } from 'react'
import { fetchCreateUser, fetchMeetingRange } from '../adapters/index'
import moment from 'moment'
import Day from '../components/Day'
import User from '../components/User'
import { withRouter } from 'react-router-dom'
var concatAll = require('concat-all')


class SelectTimesContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      meetingTimes: [],
      meetingRange: [],
      firstName: '',
      lastName: '',
      email: '',
      interval: 0,
      fetch: false,
      userCreate: true,
      user_id: 0,
      canClick: true
    }

  }

  componentDidMount() {
    fetchMeetingRange(this.props.match.params.id).then(resp => {

      const datesArray = this.getDates(resp.meeting_range.begin_date, resp.meeting_range.end_date)

      this.setState({
        meetingTimes: resp.meeting_time,
        meetingRange: datesArray,
        users: resp.users,
        interval: resp.meeting_range.interval
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
  //   // Something other than map that doesn't return values if they do not match
  //   return this.state.meetingRange.map(meetingRange => {
  //     return this.state.meetingTimes.map(meetingTime => {
  //       if (meetingTime.day.toString() === meetingRange.slice(0, 10)) {
  //       return (
  //         <Day
  //           canClick={this.state.canClick}
  //           user_id={this.state.user_id}
  //           meetingTime={meetingTime} day={moment(meetingRange).format('LL')}
  //           interval={this.state.interval}
  //           fetch={this.state.fetch}/>
  //         )
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
        meeting_range_id: this.props.match.params.id,
        email: this.state.email
      }
    }).then(resp => this.setState({user_id: resp.id, userCreate: false}))
  }

   render() {
     console.log(this.props)
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
   }
 }

 export default withRouter(SelectTimesContainer)
