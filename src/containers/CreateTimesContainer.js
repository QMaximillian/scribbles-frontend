import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Day from '../components/Day'

export default class CreateTimesContainer extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  getDates = (startDate, stopDate) => {
    let dateArray = [];
    let currentDate = moment(startDate);
    let endDate = moment(stopDate);
    while (currentDate <= endDate) {
        dateArray.push( moment(currentDate).format('ddd, MMM DDD YYYY') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }


  mapDays = () => {
    return this.getDates(this.props.location.state.beginDate.toString().substring(0, 16), this.props.location.state.endDate.toString().substring(0, 16)).map(day => {
      return <Day day={day}/>
    })
  }

   render() {
console.log(this.mapDays());
     return (
        <div>
      {this.mapDays()}
        </div>
     )
   }
 }
