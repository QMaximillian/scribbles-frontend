import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import CreateDay from '../components/CreateDay'
import { withRouter } from 'react-router'



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
    return this.getDates(new Date(this.props.location.state.beginDate), new Date(this.props.location.state.endDate)).map((day, i) => {
      return <CreateDay day={day}
      className={`create-time-item${i + 1}`}
      fetch={this.state.fetch} meeting_range_id={this.props.location.state.meeting_range_id}/>
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
         <div className="base-layout-grid">
         <div className="create-time-grid border">
         <div className="create-time-header">
          Set Time Ranges to Meet
         </div>

        {this.mapDays()}

          <div className="create-time-button">
            {this.state.fetch ? <></> :

            <button onClick={() => this.handleFetches()}>Save Times</button>

            }
          </div>
          <div className="create-time-button">
          {this.state.fetch ? <button onClick={() => this.setState({redirect: !this.state.redirect})}>Go To Meeting Container</button> : <></>

        }
          </div>
        </div>
        </div>
       )
     }
   }
 }

 export default withRouter(CreateTimesContainer)
