import React from 'react'


const Time = (props) => {

  // onClick function that highlights choices that work
  // fetch to create new times associated with User and MeetingRange
  
  return(
    <div>
      {props.beginTime}
      {props.endTime}
    </div>
  )
}

export default Time
