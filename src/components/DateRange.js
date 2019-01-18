import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


const DateRange = (props) => {
  return(
    <div>
  <label> First Day </label>
      <DatePicker
       onChange={props.handleBeginDatePicker}
      selected={props.beginDate}/>
  <label> Last Day </label>
      <DatePicker
       onChange={props.handleEndDatePicker}
      selected={props.endDate}/>

  <label> End Poll </label>
      <DatePicker
       onChange={props.handleEndPollPicker}
      selected={props.endPoll}/>
    </div>
  )
}

export default DateRange
