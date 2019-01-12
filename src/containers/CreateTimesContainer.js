import React, { Component } from 'react'
import moment from 'moment'
import Day from '../components/Day'


export default class CreateTimesContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      fetch: false
    }
  }

  getDates = (startDate, stopDate) => {
    let dateArray = [];
    let currentDate = moment(startDate);
    let endDate = moment(stopDate);
    while (currentDate <= endDate) {
        dateArray.push(moment(currentDate).format())
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }


  mapDays = () => {
    return this.getDates(new Date(this.props.location.state.beginDate), new Date(this.props.location.state.endDate)).map(day => {
      return <Day day={day} fetch={this.state.fetch} meeting_range_id={this.props.location.state.meeting_range_id}/>
    })
  }

   render() {

     return (
       <>
        <div>
      {this.mapDays()}
        </div>
        <div>
          <button onClick={() => this.setState({
            fetch: !this.state.fetch
          })}>Submit Times</button>
        </div>
      </>
     )
   }
 }
