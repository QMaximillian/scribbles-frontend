import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Field } from 'redux-form'
import moment from 'moment'

const DateRange = (props) => {

  const renderDatePicker = ({ input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
        <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value).toDate() : null} value={input.value ? moment(input.value).format('LL'): null} />
        {touched && error && <span>{error}</span>}
        {console.log(input)}
  </div>
);

  return(
    <div>
  <label> First Day </label>
      <Field name="beginDate" component={renderDatePicker}/>
      {/* <DatePicker
       onChange={props.handleBeginDatePicker}
      selected={props.beginDate}/> */}
  <label> Last Day </label>
      <DatePicker
       onChange={props.handleEndDatePicker}
      selected={props.endDate}/>
    </div>
  )
}

export default DateRange
