import React from 'react'
import moment from 'moment'
import Time from './Time'

const TimeRange = (props) => {

  // onClick function that highlights choices that work
  // fetch to create new times associated with User and MeetingRange

    const getDateHoursMoment = () => {

      const { beginTime, endTime, interval } = props

      let startTime = moment(beginTime)
      let stopTime = moment(endTime)

      let timeStops = []

  if (interval !== undefined){
      while(startTime < stopTime){
        timeStops.push(moment(startTime).format('YYYY-MM-DD HH:mm Z'))
        startTime.add(interval, 'minutes');
      }
    }
    return timeStops
  }

  const mappedTimesAvailable = () => {
    return getDateHoursMoment().map(time => {
      return <Time
            handleFinalDate={props.handleFinalDate}
            adminView={props.adminView}
            presentationView={props.presentationView}
            addView={props.addView}
            creator={props.creator}
            users={props.users}
            day={props.day}
            interval={props.interval}
            time={time}
            fetch={props.fetch}
            meetingTime={props.meetingTime}
            joinedUsers={props.joinedUsers}
            meetingRangeId={props.meetingRangeId}
            user_id={props.user_id}/>
    })
  }



  return(
        <>
          {mappedTimesAvailable()}
        </>
  )
}

export default TimeRange
