import React from 'react'
import '../App.css'

const User = (props) => {
  return(
    <>
      <div className="join-poll">
        Join the Poll
      </div>
      <input
      className="user-name"
       onChange={props.handleChange}
       name="firstName"
       placeholder="Enter your first name...">
      </input>
      <input
      className="last-name"
       onChange={props.handleChange}
       name="lastName"
       placeholder="Enter your last name...">
      </input>
      <input
      className="email"
       onChange={props.handleChange}
       name="email"
       placeholder="Enter your email...">
      </input>
      <button className="user-create-button" onClick={props.handleUserCreate}>Create</button>
    </>
  )
}

export default User
