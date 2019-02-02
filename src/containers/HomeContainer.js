import React, { Component } from 'react'
import { setUserInformation } from '../actions/index'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import '../App.css'

class HomeContainer extends Component {
  constructor(props) {
    super(props)
      this.state = {
        redirect: false,
        user: {
          first_name: '',
          last_name: '',
          email: '',
          admin: '',
        }
      }
  }

  handleNameChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = () => {
    this.props.setUserInformation(this.state.user)
    return this.props.history.push('/create/date_range')
  }
   render() {
     return (
        <div className="home-grid">
          <div className="top-bar">
          Welcome to Scribble
          </div>
          <i className="below-top-bar">Schedule a simple meeting with Scribble</i>
          <div className="below-center">
          <label>
            First Name
          </label>
          <input onChange={this.handleNameChange}
            value={this.state.user.first_name}
            name="first_name">
          </input>
          <label>
            Last Name
          </label>
          <input
            onChange={this.handleNameChange}
            value={this.state.user.last_name}
            name="last_name">
          </input>
          <label>
            Email
          </label>
          <input
            onChange={this.handleNameChange}
            value={this.state.user.email}
            name="email">
          </input>
          <button onClick={() => this.handleSubmit()}>
            Create A Scribble
          </button>
          </div>
        </div>


     )
   }
 }

 export default withRouter(connect(null, { setUserInformation })(HomeContainer))
