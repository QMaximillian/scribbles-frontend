import React, { Component } from 'react'
import '../App.css'

export default class HomeContainer extends Component {
   render() {
     return (
        <div className="base-layout-grid">
          <div className="home-grid border">
            <div className="home">
            Welcome to Scribble
            </div>
            <div>
            <button onClick={() => this.props.history.push('meeting_range/create/range')}>
              Create A Scribble
            </button>
            </div>
            <div>
              <i>Schedule a simple meeting with Scribble</i>
            </div>
          </div>
        </div>
     )
   }
 }
