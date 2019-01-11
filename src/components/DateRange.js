import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const DateRange = (props) => {
  return(
    <div>
  <label> Begin </label>
      <DatePicker
       onChange={props.handleBeginDatePicker}
      selected={props.beginDate}/>
  <label> End </label>
      <DatePicker
      
       onChange={props.handleEndDatePicker}
      selected={props.endDate}/>
    </div>
  )
}

export default DateRange
