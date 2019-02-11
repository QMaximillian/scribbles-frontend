import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TimeRangeV3 from '../components/TimeRangeV3'
import moment from 'moment'

const TimeRangeWeek = (props) => {

  const renderWeek = () => {
    console.log(props.datesWithTimes)
    if (props.datesWithTimes[props.activePage]) {
    return props.datesWithTimes[props.activePage].map((date, i) => {

      return (
        <span>
        <div
          key={i}
          className={`time-range-day-${i + 1}`}
          >
            {moment(date.date).format('LL')}
          </div>
            <div>
              <TimeRangeV3 date={date.date} beginTime={date.beginTime} endTime={date.endTime} fetch={props.fetch} />
            </div></span>)
    })
  } else {
    return 'LOADING...'
  }
  }



  return(
    <div className="">
      {renderWeek()}
    </div>
  )
}

export default TimeRangeWeek
