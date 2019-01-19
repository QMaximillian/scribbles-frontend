import React from 'react'
import TimeRange from '../components/TimeRange'

const Day = (props) => {

  // Function that returns a new Time component for each time within intervals

  const timeMap = () => {
    return <TimeRange
    handleFinalDate={props.handleFinalDate}
    finalChoice={props.finalChoice}
    creator={props.creator}
    day={props.day}
    joinedUsers={props.joinedUsers}
    canClick={props.canClick}
    user_id={props.user_id}
    beginTime={props.meetingTime.begin_time}
    endTime={props.meetingTime.end_time}
    interval={props.interval}
    fetch={props.fetch}
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
