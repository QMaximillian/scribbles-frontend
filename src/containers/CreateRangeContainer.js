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

  handleSubmit = () => {
    this.setState({
      fetch: !this.state.fetch,

    }, () => this.setState({redirect: !this.state.redirect}))
  }



   render() {
     console.log(this.props.meetingRangeId)
     if (this.state.redirect) {
       return <Redirect exact to={{ pathname: `/meeting_range/${this.props.meetingRangeId}/admin`}}/>
     } else if (this.props.datesWithTimes) {
     return (
        <div className="home-grid-v2">
          <div className="meeting-times-container border">
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
          <TimeRangeWeek
          fetch={this.state.fetch}
            datesWithTimes={this.setupDates()} activePage={this.state.activePage}
            />
        </div>
          <button className=""
            onClick={() => this.handleSubmit()}>
            Save Times
          </button>
          </div>
        </div>
     )
   } else {
     return(<div>LOADING...</div>)
   }
   }
 }

 export default withRouter(connect(state => ({dateRange: state.dateRange, userInformation: state.userInformation, datesWithTimes: state.datesWithTimes, meetingRangeId: state.meetingRangeId}))(CreateRangeContainer))
