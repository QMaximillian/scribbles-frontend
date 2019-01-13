import React, { Component } from 'react'
import TimeRange from './TimeRange'
import moment from 'moment'
import {fetchCreateTime} from '../adapters/index.js'


class CreateDay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      beginTime: new Date(this.props.day),
      endTime: new Date(this.props.day),
      meeting_range_id: 0
    }
  }

  componentDidUpdate() {
    if (this.props.fetch) {
      fetchCreateTime({
          meeting_time: {
            meeting_range_id: this.props.meeting_range_id,
            user_id: 1,
            day: this.state.beginTime,
            begin_time: moment(this.state.beginTime).utc().format(),
            end_time: moment(this.state.endTime).utc().format()
          }
        })
    }
  }

  handleBeginTimeChange = (date) => {
    this.setState({
      beginTime: date
    }, () => console.log(moment(this.state.beginTime).utc().format()))
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

export default CreateDay
