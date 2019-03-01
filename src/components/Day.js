import React from 'react'
import TimeRange from '../components/TimeRange'


const Day = (props) => {

  // Function that returns a new Time component for each time within intervals



  return(
    <div>
      <div className="bold">
        {props.day}
      </div>
      <TimeRange
      handleFinalDate={props.handleFinalDate}
      adminView={props.adminView}
      presentationView={props.presentationView}
      addView={props.addView}
      creator={props.creator}
      day={props.day}
      users={props.users}
      beginTime={props.meetingTime.begin_time}
      endTime={props.meetingTime.end_time}
      interval={props.interval}
      fetch={props.fetch}
      meetingTime={props.meetingTime}
      joinedUsers={props.joinedUsers}
      meetingRangeId={props.meetingRangeId}
      user_id={props.user_id}
      />
    </div>

  )
}

export default Day
