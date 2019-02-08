import React, { Component } from 'react'
import '../App.css'

class HomeContainer extends Component {
   render() {
     return (
          <div
          className="home-container border">
            <div>
            Welcome to Scribble
            </div>
            <div
            className="below-top-bar">
              Schedule a simple meeting with Scribble
            </div>
            <div
            className="below-center">
              <button
              onClick={() => this.props.history.push('meeting_range/create/range')}>
                Create A Scribble
              </button>
            </div>
          </div>
     )
   }
 }

 export default HomeContainer
