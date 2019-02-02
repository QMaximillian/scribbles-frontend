import React, { Component } from 'react'
import moment from 'moment'
import Day from '../components/Day'
import { withRouter } from 'react-router-dom'
import DateRange from '../components/DateRange'
import { setDateRange } from '../actions/index'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'

class CreateDateRangeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meeting_range_id: 0,
      redirect: false,
      time: {
        beginDate: moment().format(),
        endDate: moment().format(),
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

  handleSubmit = () => {
    this.props.setDateRange([this.state.time.beginDate, this.state.time.endDate])

    this.setState({
      redirect: true
    })
  }

   render() {
     if (this.state.redirect) {
       return <Redirect to="/create/meeting_range"/>
     }
     return (
        <div>
          <DateRange beginDate={this.state.time.beginDate} endDate={this.state.time.endDate}
          handleBeginDatePicker={this.handleBeginDatePicker}
          handleEndDatePicker={this.handleEndDatePicker}/>
          <button onClick={() => this.handleSubmit()}>
            CreateDays
          </button>
        </div>
     )
   }
 }

export default withRouter(connect(null, { setDateRange })(CreateDateRangeContainer))
