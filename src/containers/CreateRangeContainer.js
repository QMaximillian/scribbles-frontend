import React, { Component } from 'react'
import { fetchPostMeetingRange, fetchCreateUser } from '../adapters/index.js'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import '../App.css'


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
    }
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
        <div className="time-range-grid">
        <div className="time-range-grid-item1">
        <label>
          Setup Times You're Available
        </label>
            <div>
              Time Limit
              <select onChange={this.handleIntervalChange}>
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
              </select>
            </div>
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

 export default withRouter(connect(state => ({dateRange: state.dateRange, userInformation: state.userInformation}))(CreateRangeContainer))
