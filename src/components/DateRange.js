import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


const DateRange = (props) => {
  return(
    <>
    <div className={props.className1}>
      <label> First Day </label><br />
        <DatePicker
        style={{textColor: 'green'}}
         onChange={props.handleBeginDatePicker}
        selected={props.beginDate}/>
    </div>
    <div className={props.className2}>
      <label> Last Day </label><br />
        <DatePicker
         onChange={props.handleEndDatePicker}
        selected={props.endDate}/>
    </div>
    </>
  )
}

export default DateRange
