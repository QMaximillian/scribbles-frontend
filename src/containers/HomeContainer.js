import React, { Component } from 'react'
import '../App.css'

export default class HomeContainer extends Component {
   render() {
     return (
        <div className="base-layout-grid">
          <div className="home-grid border">
          <div style={{fontSize: '50px', fontStyle: 'oblique'}}>Scribble</div>
            <div style={{fontSize: '20px'}} className="home">
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
