import React, { Component } from 'react'
import { fetchPostMeetingRange, fetchCreateUser } from '../adapters/index.js'
import TimeRangeV3 from '../components/TimeRangeV3'
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
      activePage: 1,
      fetch: false,
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

  // handleUserCreatePost = () => {
  //   fetchCreateUser({user: {...this.state.user, meeting_range_id: this.state.meeting_range_id}})
  // }

  handleIntervalChange = (e) => {
      this.setState({
        time: {
        ...this.state.time,
        interval: parseInt(e.target.value)
      }})
    }


  setupDates = () => {
    const { datesWithTimes } = this.props
    console.log(datesWithTimes)
      if (datesWithTimes.length <= 6) {
        return {1: datesWithTimes}
      } else if (datesWithTimes.length > 6){
        return {1: datesWithTimes.slice(0, 7), 2: datesWithTimes.slice(7, 14)}

      }
  }

  renderWeek = () => {
    const datesWithTimes = this.setupDates()
    if (datesWithTimes[this.state.activePage]) {
    return datesWithTimes[this.state.activePage].map((date, i) => {
      return (
        <div>
          <div
            key={i}
            className={`time-range-day-${i + 1}`}
            >
              {moment(date.date).format('LL')}
          </div>
          <div style={{border: 'black solid 2px'}}>
            <TimeRangeV3 date={date.date} beginTime={date.beginTime} endTime={date.endTime} fetch={this.state.fetch} />
          </div>
        </div>)
    })
  } else {
    return 'LOADING...'
  }
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

  handleSave = () => {
    this.setState({
      fetch: !this.state.fetch,
    })
  }

  handleSubmit = () => {
   this.setState({redirect: !this.state.redirect})
  }



   render() {
     console.log(this.props.meetingRangeId)
     if (this.state.redirect) {
       return <Redirect exact to={{ pathname: `/meeting_range/${this.props.meetingRangeId}/admin`}}/>
     } else if (this.props.datesWithTimes) {
     return (
        <div className="home-grid">
          <div className="meeting-times-grid-placement border">
            <div className="meeting-times-header">
              Setup Times You're Available
            </div>
        <div className="meeting-times-pagination">
          <button onClick={() => this.handlePaginationBackward()}>
            ⟵
          </button>
          <button onClick={() => this.handlePaginationForward()}>
            ⟶
          </button>
        </div>
        <div className="meeting-times-grid">
          {this.renderWeek()}
        </div>
          <button className=""
            onClick={() => this.handleSave()}>
            Save Times
          </button>
          <button className=""
            onClick={() => this.handleSubmit()}>
            Checkout Times
          </button>
          </div>
        </div>
     )
   } else if(this.props.activePage < 1 || this.state.activePage > 2){

     return(<div>LOADING...</div>)
   }
   }
 }

 export default withRouter(connect(state => ({dateRange: state.dateRange, userInformation: state.userInformation, datesWithTimes: state.datesWithTimes, meetingRangeId: state.meetingRangeId}))(CreateRangeContainer))
