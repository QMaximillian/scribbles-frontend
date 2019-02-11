import React, { Component } from 'react'
import moment from 'moment'
import Time from '../components/Time'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'


class TimeRangeV3 extends Component {
  constructor(props){
    super(props)

    this.state = {
      times: [],
      range: [],
      rangeColor: ''
    }
  }

  componentDidMount(){
    this.renderTimes()
  }

  // OLD OLD OLD OLD solid

  // renderTimes = () => {
  //   const timeArray = []
  //   let beginDate =  moment(moment(this.props.date).format(), [moment.HTML5_FMT.DATE])
  //
  //   const endDate = moment(moment(this.props.date).format(), [moment.HTML5_FMT.DATE]).add(1, 'day')
  //
  //   while(beginDate < endDate) {
  //     timeArray.push(beginDate.format('ha'))
  //
  //     beginDate = beginDate.add(1, 'hours')
  //
  //   }
  //   console.log(timeArray);
  //   this.setState({
  //     times: timeArray
  //   })
  // }

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

  renderTimes = () => {
    const timeArray = []
    // console.log(moment(this.props.date).format("YYYY-MM-DDT00:00:00-5:00"))
    let beginTime = moment(this.props.beginTime)
    // .format("YYYY-MM-DDT00:00:00-5:00")

    const endTime = moment(this.props.endTime)
    // .format("YYYY-MM-DDT00:00:00-5:00")
    //



    while(beginTime < endTime) {
      timeArray.push(moment(beginTime))

      beginTime = moment(beginTime).add(this.props.interval, 'minutes')
    }

    this.setState({
      times: timeArray
    }, () => console.log(this.props.fetch))
  }




  mappedTimes = () => {
    return this.state.times.map(time => {
      return (
        <Time
        fetch={this.props.fetch}
        time={time}/>
      )
    })
  }






   render() {
     return (
          <div>
            {this.mappedTimes()}
          </div>
     )
   }
 }

 export default withRouter(connect(state => ({interval: state.interval}))(TimeRangeV3))
