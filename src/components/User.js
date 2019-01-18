import React from 'react'


const User = (props) => {
  return(
    <div>
      <input
       onChange={props.handleChange}
       name="firstName"
       placeholder="Enter your first name...">
      </input>
      <input
       onChange={props.handleChange}
       name="lastName"
       placeholder="Enter your last name...">
      </input>
      <input
       onChange={props.handleChange}
       name="email"
       placeholder="Enter your email...">
      </input>
      <button onClick={props.handleUserCreate}>Create</button>
    </div>
  )
}

export default User
