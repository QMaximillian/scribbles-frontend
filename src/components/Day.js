import React from 'react'
import TimeRange from '../components/TimeRange'
import moment from 'moment'
import TimeShow from './TimeShow'

const Day = (props) => {

  // Function that returns a new Time component for each time within intervals

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


  // const mappedTimesAvailable = () => {
  // return getDateHoursMoment().map(time => {
  //   return <Time
  //   joinedUsers={props.joinedUsers}
  //   beginTime={props.meetingTime.begin_time}
  //   endTime={props.meetingTime.end_time}
  //   interval={props.interval}
  //   fetch={props.fetch}/>
  // })
  // }

  const mappedTimes = () => {
    const times = props.meetingTimes.filter(meetingTime => {
      console.log(meetingTime.day, props.day)
      if (meetingTime.day === props.day) {
        return meetingTime
      }
    })
    console.log(times)
    return times.map(time => {
      console.log(time)
      return (<TimeShow time={time}/>)
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
