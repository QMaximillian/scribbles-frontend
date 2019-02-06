import React from 'react'
import moment from 'moment'


const ConfirmedDate = (props) => {
  return(
    <>
      <div>
        Confirmed Meeting Date
      </div>
      <div>
      {moment(props.location.state.finalDate).format('LL')}
      <div>
      {moment(props.location.state.finalDate).format('hh:mm a')} -
      {moment(props.location.state.finalDate).add(props.location.state.interval, 'minutes').format('hh:mm a')}
      </div>
      </div>
    </>
  )
}

export default ConfirmedDate
