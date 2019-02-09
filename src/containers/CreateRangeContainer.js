import React, { Component } from 'react'
import { fetchPostMeetingRange, fetchCreateUser } from '../adapters/index.js'


import TimeRangeWeek from '../components/TimeRangeWeek'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import '../App.css'
import { store } from '../index.js'
import { state } from 'react-redux'


class CreateRangeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meeting_range_id: 0,
      redirect: false,
      activePage: 1
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


  setupDates = () => {
    const { datesWithTimes } = this.props
      if (datesWithTimes.length <= 6) {
        return {1: datesWithTimes}
      } else if (this.props.datesWithTimes > 6){
        return {1: datesWithTimes.slice(0, 7), 2: datesWithTimes.slice(7, 14)}

      }





    // find dates in between the two dates given
    // push every 7 dates into a object with an index key
    // push them into an object with as {1: [// first 7 dates]}
    //  pass object to TimeRangeWeek
  }

  handlePaginationForward = () => {
    this.setState({
        activePage: this.state.activePage + 1
    })
  }

  handlePaginationBackward = () => {
    this.setState({
        activePage: this.state.activePage - 1
    })
  }


   render() {
     console.log(this.props)
     if (this.state.redirect) {
       return <Redirect exact to={{ pathname: '/meeting_range/create/times', state: { beginDate: this.state.time.beginDate, endDate: this.state.time.endDate, meeting_range_id: this.state.meeting_range_id} }}/>
     } else if (this.props.datesWithTimes) {
     return (
        <div className="day-range-grid">
          <div className="day-range-grid-item1">
            <label>
              Setup Times You're Available
            </label>
          </div>
        <div className="time-range-pagination">
          <button onClick={() => this.handlePaginationBackward()}>
            ⟵
          </button>
          <button onClick={() => this.handlePaginationForward()}>
            ⟶
          </button>
        </div>

          <TimeRangeWeek
            dateWithTimes={this.setupDates()} activePage={this.state.activePage}
            />
          <button className="time-range-save"
            onClick={() => {}}>
            Save Times
          </button>
        </div>
     )
   } else {
     return(<div>LOADING...</div>)
   }
   }
 }

 export default withRouter(connect(state => ({dateRange: state.dateRange, userInformation: state.userInformation, datesWithTimes: state.datesWithTimes}))(CreateRangeContainer))
