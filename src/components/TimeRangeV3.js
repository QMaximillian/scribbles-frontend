import React, { Component } from 'react'
import moment from 'moment'

export default class TimeRangeWeekV2 extends Component {
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


  renderTimes = () => {
    const timeArray = []
    // console.log(moment(this.props.date).format("YYYY-MM-DDT00:00:00-5:00"))
    let beginTime = this.props.beginTime
    // .format("YYYY-MM-DDT00:00:00-5:00")

    const endTime = this.props.endTime
    // .format("YYYY-MM-DDT00:00:00-5:00")
    //
    console.log(typeof beginTime);


    while(beginTime < endTime) {
      timeArray.push(beginTime)

      beginTime = moment(beginTime).add(1, 'hours')
    }

    this.setState({
      times: timeArray
    }, () => console.log(this.state.times))
  }




  mappedTimes = () => {
    return this.state.times.map(time => {
      return (
        <div
        onClick={() => this.createRange(time)}>
        {time}
        </div>
      )
    })
  }

  setColor = () => {
    return this.state.times.forEach(time => {
      if (this.state.range[0] === time) {
        this.setState({
          rangeColor: 'blue'
        })
      } else {
        this.setState({rangeColor: 'red'})
      }
    })
  }



  createRange = (time) => {
    if (this.state.range.length <= 1) {
      this.setState({
        range: [...this.state.range, time]
      }, () => this.setColor())
    }


    //
    // if (this.state.range.length = 1) {
      // map through the this.state.times
      // if the time argument matches a time in the array

    // }

  }


   render() {
     console.log(this.state.times);
     return (
        <div
        style={{overflow: 'scroll'}}>

          <div>{this.mappedTimes()}</div>
        </div>
     )
   }
 }
