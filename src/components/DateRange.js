import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Field } from 'redux-form'
import moment from 'moment'

const DateRange = (props) => {

  const renderDatePicker = ({ label, input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
        <label>{label}</label>
        <br/>
        <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value).toDate() : null} value={input.value ? moment(input.value).format('LL'): null} />
        {touched && error && <span>{error}</span>}
  </div>
);

  return(
    <div>
      <Field name="begin_date" label="First Day" component={renderDatePicker}/>
      <Field name="end_date" label="Last Day" component={renderDatePicker}/>
    </div>
  )
}

export default DateRange
