import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


class TimeRangeWeek extends Component {
  constructor(props) {
    super(props)

    this.state = {
      days: []
    }

  }

  setDays = () => {

  }

   render() {
     return (
        <div className="day-time-grid-">
          {this.setDays()}
        </div>
     )
   }
 }

 export default withRouter(connect()(TimeRangeWeek))
