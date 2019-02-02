import React, { useState } from 'react'
import DateRange from '../components/DateRange'
import { Field, reduxForm } from 'redux-form'
import { fetchPostMeetingRange, fetchCreateUser } from '../adapters/index.js'
import { Redirect } from 'react-router'
import { setRangeInformation } from '../actions/index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


let CreateRangeForm = props => {
  const [redirect, setRedirect] = useState(false)

  const { handleSubmit } = props

  const submit = (values) => {
    props.setRangeInformation(values)
    handleFetchPost(values)
  }

  const handleUserCreatePost = (first_name, last_name, email, meeting_range_id) => {
    fetchCreateUser({user: {first_name, last_name, email, meeting_range_id}})
  }


  const handleFetchPost = ({ begin_date, end_date, interval, first_name, last_name, email }) => {
    fetchPostMeetingRange({meeting_range:
      {
        begin_date,
        end_date,
        interval,
      }
    })
    .then(resp => {
      handleUserCreatePost(first_name, last_name, email, resp.id)
    }).then(resp => setRedirect(true))
  }


  if (redirect) {
    return (
      <Redirect exact to={{ pathname: '/meeting_range/create/times' }}/>
    )
  } else {
    return (
      <form onSubmit={handleSubmit(submit)}>
        <label>
          First Name
        </label>
        <Field
        label="First Name"
          name="first_name"
          component="input"
          type="text"
        />
        <label>
          Last Name
        </label>
        <Field
          name="last_name"
          component="input"
          type="text"
        />
        <label>
          Email
        </label>
        <Field
          name="email"
          component="input"
          type="email"
        />
        <DateRange />
            <label>
              Time Limit
            </label>
            <Field
              name="interval"
              component="select">
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
            </Field>
        <button
          type='submit'>
          Choose Times
        </button>
        </form>
    )
  }
}

CreateRangeForm = reduxForm({
  form: 'createRange'
})(CreateRangeForm)



export default withRouter(connect(null, ({ setRangeInformation }))(CreateRangeForm))
