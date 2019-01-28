import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class HomeContainer extends Component {
   render() {
     return (
        <Jumbotron>
          <div style={{textAlign: 'center'}}>
          Welcome to Scribble
          <div>
          <button onClick={() => this.props.history.push('meeting_range/create/range')}>
            Create A Scribble
          </button>
          </div>
          <i>Schedule a simple meeting with Scribble</i>
          </div>
        </Jumbotron>
     )
   }
 }

export default withRouter(connect()(HomeContainer))
