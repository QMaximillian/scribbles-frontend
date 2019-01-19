import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import CreateDay from '../components/CreateDay'
import { withRouter } from 'react-router'
import { Jumbotron } from 'react-bootstrap'

class CreateTimesContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      fetch: false,
      redirect: false,
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
      return <CreateDay day={day} fetch={this.state.fetch} meeting_range_id={this.props.location.state.meeting_range_id}/>
    })
  }

  handleFetches = () => {
    this.setState({
      fetch: !this.state.fetch
    }, () => alert("Times Saved"))
  }

   render() {
     console.log(this.props)
     if (this.state.redirect) {
       return (
         <Redirect to={"/meeting_range/" + this.props.location.state.meeting_range_id + "/admin"
          }/>
       )
     } else {
       return (
         <Jumbotron>
         <div style={{textAlign: 'center'}}>
          Set Time Ranges to Meet
         </div>
          <div>
        {this.mapDays()}
          </div>
          <div>
            {this.state.fetch ? <div></div> :
            <button onClick={() => this.handleFetches()}>Save Times</button>
            }
          <button onClick={() => this.setState({redirect: !this.state.redirect})}>Go To Meeting Container</button>
          </div>
        </Jumbotron>
       )
     }
   }
 }

 export default withRouter(CreateTimesContainer)
