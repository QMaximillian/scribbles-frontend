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
          <div className="home-container border">
          <div className='home-container-item1'>
          Welcome to Scribble
          </div>

          <div className="home-container-item2">Schedule a simple meeting with Scribble
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
            onClick={() => this.handleSubmit()}>
            Create A Scribble
          </button>
          </div>
        </div>
        </div>
     )
   }
 }

 export default withRouter(connect(state => ({ userInformation: state.user }), { setUserInformation })(HomeContainer))
