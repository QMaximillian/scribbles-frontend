import React, { Component } from 'react'
import DateRange from "../components/DateRange"
import { fetchPostMeetingRange, fetchCreateUser } from '../adapters/index.js'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { withRouter } from 'react-router'



class CreateRangeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meeting_range_id: 0,
      redirect: false,
      time: {
        beginDate: new Date(),
        endDate: new Date(),
        intervals: 15
      },
      user: {
        first_name: '',
        last_name: '',
        email: ''
      }
    }
  }

  handleNameChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }

  handleBeginDatePicker = (date) => {
    this.setState({
      time: {
        ...this.state.time,
        beginDate: date
      }
    }, () => console.log(this.state.time.beginDate))
  }

  handleEndDatePicker = (date) => {
    this.setState({
      time: {
        ...this.state.time,
        endDate: date
      }
    }, () => console.log(this.state.time))
  }

  handleFetchPost = () => {
    fetchPostMeetingRange({meeting_range: {
      begin_date: moment(this.state.time.beginDate).format(), end_date: moment(this.state.time.endDate).format()
    }})
    .then(resp => this.setState({
      meeting_range_id: resp.id
    }))
    .then(resp => {
      this.handleUserCreatePost()
      this.setState({
        redirect: !this.state.redirect,
      })
    })



  }

  handleUserCreatePost = () => {
    fetchCreateUser({user: {...this.state.user, meeting_range_id: this.state.meeting_range_id}})
  }

   render() {
     if (this.state.redirect) {
       return <Redirect exact to={{ pathname: '/meeting_range/create/times', state: { beginDate: this.state.time.beginDate, endDate: this.state.time.endDate, meeting_range_id: this.state.meeting_range_id} }}/>
     } else {
       console.log({user: {...this.state.user, meeting_range_id: this.state.meeting_range_id}})
     return (
        <div>
          <label>
            First Name
          </label>
          <input onChange={this.handleNameChange}
            value={this.state.user.first_name}
            name="first_name">
          </input>
          <label>
            Last Name
          </label>
          <input
            onChange={this.handleNameChange}
            value={this.state.user.last_name}
            name="last_name">
          </input>
          <label>
            Email
          </label>
          <input
            onChange={this.handleNameChange}
            value={this.state.user.email}
            name="email">
          </input>
          <DateRange
            handleBeginDatePicker={this.handleBeginDatePicker}
            beginDate={this.state.time.beginDate}
            handleEndDatePicker={this.handleEndDatePicker}
            endDate={this.state.time.endDate}/>
          <button
            onClick={() => this.handleFetchPost()}>
            Choose Times
          </button>

        </div>
     )
   }
   }
 }

 export default withRouter(CreateRangeContainer)
