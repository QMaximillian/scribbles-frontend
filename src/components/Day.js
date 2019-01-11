import React, { Component } from 'react'
import TimeRange from './TimeRange'
import moment from 'moment'

class Day extends Component {
  constructor(props) {
    super(props)

    this.state = {
      beginTime: new Date(this.props.day),
      endTime: new Date(this.props.day)
    }
  }

  handleBeginTimeChange = (date) => {
    this.setState({
      beginTime: date
    })
  }

  handleEndTimeChange = (date) => {
    this.setState({
      endTime: date
    }, () => console.log(this.state.endTime))
  }

  render() {

    return(
      <>
      <div>
        <label value={this.props.day}>{moment(this.props.day).format('YYYY-MM-DD')}</label>
      </div>
      <div>
        <TimeRange
        beginTime={this.state.beginTime}
        endTime={this.state.endTime}
        handleBeginTimeChange={this.handleBeginTimeChange}
        handleEndTimeChange={this.handleEndTimeChange}/>
      </div>
      </>
    )
}

}

export default Day
