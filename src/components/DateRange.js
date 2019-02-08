import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import '../App.css'


const DateRange = (props) => {
  return(
    <>
    <div className="create-range-first-day">
      <div>
        First Day
      </div>
      <div>
      <DatePicker
          minDate={new Date()}
          onChange={props.handleBeginDatePicker}
          selected={props.beginDate}/>
      </div>
      </div>
      <div className="create-range-last-day">
        <div>
          Last Day
        </div>
        <div>
        <DatePicker
          minDate={new Date()}
          onChange={props.handleEndDatePicker}
          selected={props.endDate}/>
        </div>
      </div>
    </>
  )
}

export default DateRange
