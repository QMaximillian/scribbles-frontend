import React from 'react'
import DatePicker from 'react-datepicker'


const CreateTimeRange = (props) => {
  return(
      <>
        <DatePicker
        showTimeSelect
        showTimeSelectOnly
        onChange={props.handleBeginTimeChange}
        selected={props.beginTime}
        dateFormat="h:mm aa"
        placeholderText="Choose a time"
        />
        <DatePicker
        showTimeSelect
        showTimeSelectOnly
        onChange={props.handleEndTimeChange}
        selected={props.endTime}
        dateFormat="h:mm aa"
        placeholderText="Choose a time"
        />
      </>
  )
}

export default CreateTimeRange
