import React, { Component } from 'react'


export default class HomeContainer extends Component {
   render() {
     return (
        <div>
          Welcome to Scribble
          <button onClick={() => this.props.history.push('/create/range')}>
            Create A Scribble
          </button>
        </div>
     )
   }
 }
