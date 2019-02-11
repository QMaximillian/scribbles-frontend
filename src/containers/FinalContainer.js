import React, { Component } from 'react'
import { fetchMeetingRange, fetchUpdateMeetingRange, fetchCreateInvitation, fetchUser } from '../adapters/index.js'
import moment from 'moment'
import Day from '../components/Day'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
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
      console.log(resp)
      // const datesArray = this.getDates(resp.meeting_range.begin_date, resp.meeting_range.end_date)


      this.setState({
        meetingTimes: resp.meeting_time,
        meetingRange: resp.meetingRange,
        users: resp.users,
        interval: resp.meeting_range.interval
      }, () => console.log(this.state))
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
        return(<AdminControl meetingTimes={this.state.meetingTimes}/>)
    } else if (this.props.match.params.user_type === 'user') {
        return(<UserControl />)
    } else if (this.props.match.params.user_type === 'show') {
        return(<PresentationControl/>)
    } else {
     return <div></div>
    }
   }
 }

 export default withRouter(FinalContainer)
