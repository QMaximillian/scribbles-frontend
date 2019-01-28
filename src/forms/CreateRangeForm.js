import React from 'react'
import DateRange from '../components/DateRange'
import { Field, reduxForm } from 'redux-form'

let CreateRangeForm = props => {
  const { handleSubmit } = props

  const submit = (values) => {
    console.log(values);
  }

    return (
      <form onSubmit={handleSubmit(submit)}>
        <label>
          First Name
        </label>
        <Field
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
              name="example"
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

CreateRangeForm = reduxForm({
  form: 'createRange'
})(CreateRangeForm)

export default CreateRangeForm
