import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'


const DateRange = (props) => {
  return(
    <div>
  <label> First Day </label>
      <DatePicker
        minDate={moment().format()}
       onChange={props.handleBeginDatePicker}
       selected={props.beginDate}/>
  <label> Last Day </label>
      <DatePicker
        minDate={moment().format()}
       onChange={props.handleEndDatePicker}
       selected={props.endDate}/>
    </div>
  )
}

export default DateRange
