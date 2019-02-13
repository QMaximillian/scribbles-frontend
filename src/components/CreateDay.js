import React, { Component } from 'react'
import CreateTimeRange from './CreateTimeRange'
import moment from 'moment'
import {fetchCreateTime} from '../adapters/index.js'
import { Jumbotron } from 'react-bootstrap'

class CreateDay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      beginTime: new Date(this.props.day),
      endTime: new Date(this.props.day),
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
      <div className={this.props.className}>
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
      </div>
    )
}

}

export default CreateDay
