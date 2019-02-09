import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TimeRangeV3 from '../components/TimeRangeV3'
import moment from 'moment'

const TimeRangeWeek = (props) => {
  console.log(props)
  const renderWeek = () => {
    if (props.dateWithTimes[props.activePage]) {
    return props.dateWithTimes[props.activePage].map((date, i) => {
      console.log(date)
      return (
        <span
          key={i}
          className={`time-range-day-${i + 1} time-range-day-border`}>
            {moment(date.date).format('LL')}
            <span>
              <TimeRangeV3 date={date.date} beginTime={date.beginTime} endTime={date.endTime} />
            </span>
        </span>)
    })
  } else {
    return 'LOADING...'
  }
  }



  return(
    <>
      {renderWeek()}
    </>
  )
}

export default TimeRangeWeek
