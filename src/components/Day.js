import React from 'react'
import Time from '../components/Time'

const Day = (props) => {

  // Function that returns a new Time component for each time within intervals

  const timeMap = () => {
    return <Time beginTime={props.meetingTime.begin_time}
    endTime={props.meetingTime.end_time}
    />
  }

  return(
    <span>
      {props.day}
      {timeMap()}
    </span>

  )
}

export default Day
