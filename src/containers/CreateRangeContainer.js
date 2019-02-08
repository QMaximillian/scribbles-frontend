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
        interval: 0,
      },
      user: {
        first_name: '',
        last_name: '',
        email: '',
        admin: '',
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
    })
  }

  handleFetchPost = () => {
    fetchPostMeetingRange({meeting_range: {
      begin_date: moment(this.state.time.beginDate).format(),
      end_date: moment(this.state.time.endDate).format(),
      interval: this.state.time.interval,
    }})
    .then(resp => this.setState({
      meeting_range_id: resp.id
    }))
    .then(resp => {
      this.handleUserCreatePost()
      this.setState({
        redirect: !this.state.redirect,
      }, () => console.log(this.state.redirect))
    })



  }

  handleUserCreatePost = () => {
    fetchCreateUser({user: {...this.state.user, meeting_range_id: this.state.meeting_range_id}})
  }

  handleIntervalChange = (e) => {
      this.setState({
        time: {
        ...this.state.time,
        interval: parseInt(e.target.value)
      }})
    }

   render() {
     if (this.state.redirect) {
       return <Redirect exact to={{ pathname: '/meeting_range/create/times', state: { beginDate: this.state.time.beginDate, endDate: this.state.time.endDate, meeting_range_id: this.state.meeting_range_id} }}/>
     } else {
     return (
       <div className="create-range-container border">
        <div className="create-range-banner">
          Create Your Meeting
        </div>
        <div className="create-range-first-name">
          <div>
            First Name
          </div>
          <div>
          <input onChange={this.handleNameChange}
            value={this.state.user.first_name}
            name="first_name">
          </input>
          </div>
        </div>
        <div className="create-range-last-name">
            <div>
              Last Name
            </div>
            <div className="create-range-last-name-input">
            <input
              onChange={this.handleNameChange}
              value={this.state.user.last_name}
              name="last_name">
            </input>
            </div>
          </div>

        <div>
          <div>
            Email
          </div>
          <div>
            <input
              onChange={this.handleNameChange}
              value={this.state.user.email}
              name="email">
            </input>
          </div>
        </div>
          <DateRange
            handleBeginDatePicker={this.handleBeginDatePicker}
            beginDate={this.state.time.beginDate}
            handleEndDatePicker={this.handleEndDatePicker}
            endDate={this.state.time.endDate}/>
            <div className="create-range-time-limit">
              <div>
                Time Limit
              </div>
              <div>
              <select
              style={{width: '180px'}}
               onChange={this.handleIntervalChange}>
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
              </select>
              </div>
            </div>
            <div className="create-range-time-button">
              <button
                onClick={() => this.handleFetchPost()}>
                Choose Times
              </button>
            </div>
          </div>
     )
   }
   }
 }

 export default withRouter(CreateRangeContainer)
