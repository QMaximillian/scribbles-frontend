import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class CreateTimeRange extends Component {
  constructor(props){
   super(props)

   // Validations:
   // If a number is not entered warn user to enter options

   // TO-DO
   // Allow user to not enter a range for a day (return null for that day)

   this.state = {
     beginTime: moment(this.props.date).set({hour: '09', minute: '00', second: '00'}).toDate(),
     endTime: moment(this.props.date).set({hour: '17', minute: '00', second: '00'}).toDate()
   }
 }

 componentDidUpdate(){
   if (this.props.redirect) {
     this.props.handleDatesInState({date: this.props.date, beginTime: moment(this.state.beginTime).format(), endTime: moment(this.state.endTime).format()})

     this.props.handleRedirect()
     // this.props.setDatesWithTimes({date: this.props.date, beginTime: moment(this.state.beginTime).format(), endTime: moment(this.state.endTime).format()})
   }
 }

 handleBeginTimeChange = (date) => {
   this.setState({
     beginTime: date
   }, () => console.log(this.props.date))
 }

 handleEndTimeChange = (date) => {
   this.setState({
     endTime: date
   })
 }



  render(){
    return(
      <>
        {moment(this.props.date).format('LL')}
        <DatePicker
        showTimeSelect
        showTimeSelectOnly
        onChange={this.handleBeginTimeChange}
        selected={this.state.beginTime}
        dateFormat="h:mm aa"
        placeholderText="Choose a time"
        />
        <DatePicker
        showTimeSelect
        showTimeSelectOnly
        onChange={this.handleEndTimeChange}
        selected={this.state.endTime}
        dateFormat="h:mm aa"
        placeholderText="Choose a time"
        />
      </>
    )
  }
}

export default withRouter(connect()(CreateTimeRange))
