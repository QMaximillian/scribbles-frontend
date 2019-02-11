import React, { Component } from 'react'
import { createUser } from '../actions/index'
import { withRouter, Redirect } from 'react-router'
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
        }
      }
  }

  handleNameChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    }, () => console.log({user: {...this.state.user}}))
  }

  handleSave = () => {
    this.props.createUser({user: {...this.state.user, meeting_range_id: this.props.meetingRangeId }})
  }

  handleSubmit = () => {
    this.setState({
      redirect: true
    })
  }

   render() {
     if (this.state.redirect) {
       return <Redirect to='/create/meeting_range'/>
     } else {
     return (
        <div className="home-grid">
          <div className="home-container border">
          <div className='home-container-item1'>

          </div>

          <div className="home-container-item2">Enter Your Information
          </div>
          <div className="home-container-item3">
            <label>
              First Name
            </label><br />
              <input
                onChange={this.handleNameChange}
                value={this.state.user.first_name}
                name="first_name">
              </input>
          </div>
          <div className="home-container-item4">
            <label>
              Last Name
            </label><br />
              <input
                onChange={this.handleNameChange}
                value={this.state.user.last_name}
                name="last_name">
              </input>
          </div>
          <div className="home-container-item5">
            <label>
              Email
            </label><br />
              <input
                onChange={this.handleNameChange}
                value={this.state.user.email}
                name="email">
              </input>

          </div>
          <div>
          <button
            className="home-container-item6"
            onClick={() => this.handleSave()}>
            Save Scribble
          </button>
          <button
            className="home-container-item7"
            onClick={() => this.handleSubmit()}>
            Create Scribble
          </button>
          </div>
        </div>
        </div>
     )
   }
 }
 }

 export default withRouter(connect(state => ({ meetingRangeId: state.meetingRangeId }), { createUser })(HomeContainer))
