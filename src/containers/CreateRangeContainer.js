import React, { Component } from 'react'
import DateRange from "../components/DateRange"
import { fetchPostMeetingRange } from '../adapters/index.js'

export default class CreateRangeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    })
  }

  handleEndDatePicker = (date) => {
    this.setState({
      time: {
        ...this.state.time,
        endDate: date
      }
    }, () => console.log(this.state.time.endDate))
  }

  handleFetchPost = () => {
    fetchPostMeetingRange({meeting_range: {
      begin_date: this.state.time.beginDate, end_date: this.state.time.endDate
    }})
  }

   render() {
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
