import React, { Component } from 'react'
import { fetchMeetingRange, fetchUpdateMeetingRange, fetchCreateInvitation, fetchUser } from '../adapters/index.js'
import { setUserType } from '../actions/index'
import moment from 'moment'
import Day from '../components/Day'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import AdminControl from '../components/AdminControl'
import UserControl from '../components/UserControl'
import PresentationControl from '../components/PresentationControl'


class FinalContainer extends Component {

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
      joinedUsers: [],
      finalChoice: true,
      finalDate: new Date(),
    }

  }

  componentDidMount() {
    fetchMeetingRange(this.props.match.params.id).then(resp => {

      const datesArray = this.getDates(resp.meeting_range.begin_date, resp.meeting_range.end_date)
console.log(datesArray)
      this.setState({
        meetingTimes: resp.meeting_time,
        meetingRange: datesArray,
        users: resp.users,
        interval: resp.meeting_range.interval
      })
    })
  }

  // getDates = (startDate, stopDate) => {
  //   let dateArray = [];
  //   let currentDate = moment(startDate);
  //   let endDate = moment(stopDate);
  //
  //   while (currentDate <= endDate) {
  //       dateArray.push(moment(currentDate).format())
  //       currentDate = moment(currentDate).add(1, 'days');
  //   }
  //
  //   return dateArray;
  // }

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

  meetingRangeLoop = () => {
    const { meetingTimes, meetingRange } = this.state
    console.log(meetingTimes)
    console.log(meetingRange)
    let dayArray = []


    for (let range in meetingRange) {
      console.log(meetingRange[range].slice(0, 10))
      for (let time in meetingTimes) {
        console.log(meetingTimes[time].day.slice(0, 10))
        let i = 1

        if (meetingRange[range].slice(0, 10) === meetingTimes[time].day.slice(0, 10)) {

          dayArray.push(
              <div className={`day-range-item-${i}`}>
              <Day
                meetingTime={meetingTimes[time]} day={moment(meetingRange[range]).format('LL')}
                interval={this.state.interval}/>
              </div>
            )

            i++
            console.log(dayArray)
          }
        }
      }
      return dayArray
  }




   render() {

    if (this.state.redirect) {
      return <Redirect exact to={{ pathname: `/meeting_range/${this.props.match.params.id}/confirmed`}}/>
    }

    // if (this.state.user_ids[0]) {
    //  return (
    //     <div>
    //       {this.state.users[0].first_name + ' ' + this.state.users[0].last_name}'s Poll
    //     </div>
    // )

    if (this.props.match.params.user_type === 'admin') {
        this.props.setUserType(this.props.match.params.user_type)
        return(<AdminControl setupDatesAndTimes={this.meetingRangeLoop()}/>)
    } else if (this.props.match.params.user_type === 'user') {
        this.props.setUserType(this.props.match.params.user_type)
        return(<UserControl meetingTimes={this.state.meetingTimes}/>)
    } else if (this.props.match.params.user_type === 'show') {
        this.props.setUserType(this.props.match.params.user_type)
        return(<PresentationControl meetingTimes={this.state.meetingTimes}/>)
    } else {
     return <div></div>
    }
   }
 }

 export default withRouter(connect(null, ({ setUserType }))(FinalContainer))
