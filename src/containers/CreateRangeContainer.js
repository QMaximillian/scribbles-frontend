import React, { Component } from 'react'
import { fetchPostMeetingRange, fetchCreateUser } from '../adapters/index.js'
// import TimeRangeWeek from '../components/TimeRangeWeek'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import '../App.css'
import { store } from '../index.js'
import { state } from 'react-redux'



const TimeRangeWeek = (props) => {

  const renderWeek = () => {
    console.log(props.dates)
    return props.dates.map((date, i) => {
      return (<span className={`time-range-day-${i + 1}`}>
                {moment(date).format('LL')}
              </span>)
    })
  }

  return(
    <>
      {renderWeek()}
    </>
  )
}


class CreateRangeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meeting_range_id: 0,
      redirect: false,
      week: [],
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
    
    // find dates in between the two dates given
    // push every 7 dates into a object with an index key
    // push them into an object with as {1: [// first 7 dates]}
    //  pass object to TimeRangeWeek
  }

   render() {
     console.log(this.props.dateRange)
     if (this.state.redirect) {
       return <Redirect exact to={{ pathname: '/meeting_range/create/times', state: { beginDate: this.state.time.beginDate, endDate: this.state.time.endDate, meeting_range_id: this.state.meeting_range_id} }}/>
     } else {
     return (
        <div className="day-range-grid">
        <div className="day-range-grid-item1">
        <label>
          Setup Times You're Available
        </label>
        </div>
          <TimeRangeWeek dates={this.props.dateRange}/>
          <button
            onClick={() => {}}>
            Save Times
          </button>
        </div>

     )
   }
   }
 }

 export default withRouter(connect(state => ({dateRange: state.dateRange, userInformation: state.userInformation}))(CreateRangeContainer))
