import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const DateRange = (props) => {
  return(
    <div>
  <label> Begin </label>
      <DatePicker />
  <label> End </label>
      <DatePicker />
    </div>
  )
}

export default DateRange
