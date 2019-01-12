import React, { Component } from 'react'
import DateRange from "../components/DateRange"
import { fetchPostMeetingRange } from '../adapters/index.js'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

export default class CreateRangeContainer extends Component {
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
        firstName: '',
        lastName: ''
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
    }}).then(resp => this.setState({
      redirect: !this.state.redirect,
      meeting_range_id: resp.id
    }))
  }

   render() {
     if (this.state.redirect) {
       return <Redirect to={{ pathname: '/create/times', state: { beginDate: this.state.time.beginDate, endDate: this.state.time.endDate, meeting_range_id: this.state.meeting_range_id} }}>My route</Redirect>
     } else {
     return (
        <div>
          <label>
            First Name
          </label>
          <input onChange={this.handleNameChange}
            value={this.state.user.firstName}
            name="firstName">
          </input>
          <label>
            Last Name
          </label>
          <input
            onChange={this.handleNameChange}
            value={this.state.user.lastName}
            name="lastName">
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
