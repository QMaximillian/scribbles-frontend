import React, { Component } from 'react'
import DateRange from "../components/DateRange"
import TimeRange from "../components/TimeRange"

export default class CreateMeetingContainer extends Component {

  state = {
    beginDate: "",
    endDate: "",
    intervals: 15
  }

   render() {
     return (
        <div>
          <DateRange />
          <TimeRange intervals={this.state.intervals}/>
        </div>
     )
   }
 }
