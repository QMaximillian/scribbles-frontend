import React from 'react'
import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css"

const TimeRange = (props) => {
  return(
    <div>
      <DatePicker
      showTimeSelect
      showTimeSelectOnly
      dateFormat="h:mm aa"
      timeIntervals={props.intervals}
      />
    </div>
  )
}

export default TimeRange
