import React from 'react'
import moment from 'moment'
import { Jumbotron } from 'react-bootstrap'

const ConfirmedDate = (props) => {
  return(
    <Jumbotron style={{textAlign: 'center'}}>
      <div>
        Confirmed Meeting Date
      </div>
      {moment(props.location.state.finalDate).format('LL')}
      <div>
      {moment(props.location.state.finalDate).format('hh:mm a')} -
      {moment(props.location.state.finalDate).add(props.location.state.interval, 'minutes').format('hh:mm a')}
      </div>

    </Jumbotron>
  )
}

export default ConfirmedDate
