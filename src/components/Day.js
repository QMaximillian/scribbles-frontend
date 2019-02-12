import React from 'react'
import TimeRange from '../components/TimeRange'
import moment from 'moment'
import TimeShow from './TimeShow'

const Day = (props) => {

  // Function that returns a new Time component for each time within intervals

  const mappedTimes = () => {
    const times = props.meetingTimes.filter(meetingTime => {

      if (meetingTime.day === props.day) {
        return meetingTime
      }
    })
    return times.map(time => {
      return (<TimeShow userId={props.userId} fetch={props.fetch} time={time}/>)
    })
  }

  return(
    <span>
      {moment(props.day).format('LL')}
      {mappedTimes()}
    </span>

  )
}

export default Day
