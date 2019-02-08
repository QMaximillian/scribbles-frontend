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
            <div>
              Schedule a simple meeting with Scribble
            </div>
            <div>
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
