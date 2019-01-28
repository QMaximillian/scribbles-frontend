import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Jumbotron } from 'react-bootstrap'
import CreateRangeForm from '../forms/CreateRangeForm'

class CreateRangeContainer extends Component {


   render() {
     return (
        <Jumbotron>
        <div style={{textAlign: 'center'}}>
        <label>Create Your Meeting</label>
        </div>
        <CreateRangeForm onSubmit={this.handleSubmit}/>
        </Jumbotron>
     )
   }
}


 export default withRouter(CreateRangeContainer)
