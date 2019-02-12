import React from 'react'
import Day from './Day'


const PresentationControl = (props) => {
  const displayMeetingTimes = () => {

    return props.meetingTimes.map(meetingTime => {
      return <Day day={meetingTime.day} meetingTimes={props.meetingTimes}/>
    })
  }

  console.log(props)
  return(
    <div>
      {displayMeetingTimes()}
    </div>
  )
}


export default PresentationControl
