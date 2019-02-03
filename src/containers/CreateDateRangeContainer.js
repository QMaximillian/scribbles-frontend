import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { setDateRange } from '../actions/index'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'
import '../App.css'

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
                  minDate={moment().format()}
                 onChange={this.handleBeginDatePicker}
                 selected={this.state.time.beginDate}/>
            </div>
            <div className="date-range-container-item3">
              <label>
                Last Day
              </label><br />
                <DatePicker
                  className=''
                  minDate={moment().format()}
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
