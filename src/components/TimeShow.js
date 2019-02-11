import React, { Component } from 'react'
import moment from 'moment'

export default class TimeShow extends Component {
   render() {
     console.log(this.props.time);
     return (
        <div>
          {moment(this.props.time.begin_time).format('h:mm a')} - 
          {moment(this.props.time.end_time).format('h:mm a')}
        </div>
     )
   }
 }
