import React, { Component } from 'react'

import { setDatesWithTimes } from '../actions/index'
import moment from 'moment'
import { Redirect, withRouter } from 'react-router'
import { connect, store } from 'react-redux'
import CreateTimeRange from '../components/CreateTimeRange'



class CreateMeetingTimesContainer extends Component {
  constructor(props){
   super(props)

   this.state = {
     redirect: false,
     reduxSubmit: false,
     datesInState: [],
     redirect2: false
   }
 }


componentDidMount(){

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

 handleRedirect = () => {
   this.setState({
     redirect2: true
   })
 }

 handleDatesInState = (date) => {
   this.setState(prevState => {
     return {
     datesInState: [...prevState.datesInState, date]
    }
  }, () => this.props.setDatesWithTimes(this.state.datesInState))
 }

 mapDays = () => {
   return this.getDates(this.props.dateRange[0], this.props.dateRange[1]).map(date => {
     return <CreateTimeRange date={date} redirect={this.state.redirect} handleDatesInState={this.handleDatesInState} handleRedirect={this.handleRedirect}/>
   })
   // return this.getDates(this.props.location.state.beginDate, this.props.location.state.endDate).map(day => {
   //   return <CreateDay day={day} fetch={this.state.fetch} meeting_range_id={this.props.location.state.meeting_range_id}/>
   // })
 }

 handleSubmit = () => {


  this.setState({redirect: !this.state.redirect})
 }

  render() {
    if (this.state.redirect && this.state.redirect2) {
      return (
        <Redirect to={"/create/meeting_times/"
         }/>
      )
    } else {
      return (
        <div className="create-time-container border">
        <div>
         Set Time Ranges to Meet
        </div>
         <div>
       {this.mapDays()}
         </div>
         <div>Save Times
         <button onClick={() => this.handleSubmit()}>
            Go To Meeting Container
         </button>
         </div>
         </div>
      )
    }
  }
}

export default withRouter(connect(state => ({dateRange: state.dateRange, meetingRangeId: state.meetingRangeId, userInformation: state.userInformation }), ({ setDatesWithTimes }))(CreateMeetingTimesContainer))
