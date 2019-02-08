import React, { Component } from 'react'
import CreateTimeRange from './CreateTimeRange'
import moment from 'moment'
import { fetchCreateTime } from '../adapters/index.js'

class CreateDay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      beginTime: moment(this.props.day).set({h: '09', m: '00', s: '00'}).toDate(),
      endTime: moment(this.props.day).set({h: '17', m: '00', s: '00'}).toDate(),
      meeting_range_id: 0,
      interval: 0
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
    })
  }

  handleEndTimeChange = (date) => {
    this.setState({
      endTime: date
    })
  }

  render() {
    return(
      <>
      <div>
        <label value={this.props.day}>{moment(this.props.day).format('LL')}</label>
      </div>
      <div>
        <CreateTimeRange
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
