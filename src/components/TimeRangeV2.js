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
  //   let beginDate = moment(moment(this.props.date).format(), [moment.HTML5_FMT.DATE])
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
    let beginDate = moment(this.props.date)
    // .format("YYYY-MM-DDT00:00:00-5:00")

    const endDate = moment(this.props.date)
    .add(1, 'day')
    // .format("YYYY-MM-DDT00:00:00-5:00")
    //


    while(beginDate < endDate) {
      timeArray.push(beginDate)

      beginDate = moment(beginDate).add(1, 'hours')
    }

    this.setState({
      times: timeArray
    })
  }




  mappedTimes = () => {
    return this.state.times.map(time => {
      if (this.state.range[0] === time || this.state.range[1] === time) {
      return (
        <div
          style={{color: this.state.rangeColor}}
          onClick={() => this.createRange(time)}>
          {time.format()}
        </div>
      )
    } else if (this.state.range.length === 2) {

      while (this.state.range[0] < this.state.range[1]) {
        if (time === this.state.range[0]) {
          return (
            <div
              style={{color: this.state.rangeColor}}
              onClick={() => this.createRange(time)}>
              {time.format()}
            </div>
          )
        }
        moment(this.state.range).add(1, 'hour')
      }

      return (
        <div></div>
      )
    } else {
      return (
        <div
        onClick={() => this.createRange(time)}>
        {time.format()}
        </div>
      )
    }
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

     return (
        <div
        style={{overflow: 'scroll'}}>

          <div>{this.mappedTimes()}</div>
        </div>
     )
   }
 }
