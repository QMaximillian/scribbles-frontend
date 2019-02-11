import React from 'react'
import Day from './Day'

const AdminControl = (props) => {

  const displayMeetingTimes = () => {
    return props.meetingTimes.map(meetingTime => {
      return <Day day={meetingTime.day} meetingTimes={props.meetingTimes}/>
    })
  }

  return(
    <div>
      {displayMeetingTimes()}
    </div>
  )
}

export default AdminControl
