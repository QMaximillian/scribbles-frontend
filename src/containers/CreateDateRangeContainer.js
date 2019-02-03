import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { setDateRange } from '../actions/index'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'
import 'react-datepicker/dist/react-datepicker.css'

import '../App.css'

class CreateDateRangeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meeting_range_id: 0,
      redirect: false,
      time: {
        beginDate: moment().toDate(),
        endDate: moment().toDate(),
        interval: 0,
      }
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

  getDates = () => {
    const { beginDate, endDate } = this.state.time
    let dateArray = [];
    let currentDate = beginDate
    while (currentDate < endDate) {
        dateArray.push(moment(currentDate).format())
        currentDate = moment(currentDate).add(1, 'days');
    }
    dateArray.push(moment(endDate).format())

    if (dateArray.length < 7) {
    return {1: dateArray}
  } else {
    return {1: dateArray.slice(0, 7), 2: dateArray.slice(7)}
  }

  }

  handleSubmit = () => {

    this.props.setDateRange(this.getDates())

    this.setState({
      redirect: true
    })
  }

   render() {
     console.log(this.props)
     if (this.state.redirect) {
       return <Redirect to="/create/meeting_range"/>
     }
     return (
        <div className="home-grid">
        <div className="date-range-container border">
        <div className="date-range-container-item1">
          Choose Your Range of Dates
        </div>
          <div className="date-range-container-item2">
              <label>
                First Day
              </label><br />
                <DatePicker
                  minDate={moment().toDate()}
                 onChange={this.handleBeginDatePicker}
                 selected={this.state.time.beginDate}/>
            </div>
            <div className="date-range-container-item3">
              <label>
                Last Day
              </label><br />
                <DatePicker
                  className=''
                  minDate={moment().toDate()}
                 onChange={this.handleEndDatePicker}
                 selected={this.state.time.endDate}/>
            </div>
          <div className="date-range-container-item4">
          <button onClick={() => this.handleSubmit()}>
            CreateDays
          </button>
          </div>
        </div>
        </div>
     )
   }
 }

export default withRouter(connect(state => ({ state: state.userInformation }), { setDateRange })(CreateDateRangeContainer))