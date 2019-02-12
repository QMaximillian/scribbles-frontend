import { SET_DATE_RANGE, SET_USER_INFORMATION, SET_DATES_WITH_TIMES, SET_INTERVAL_TIME, SET_MEETING_RANGE_ID, SET_USER_TYPE } from './types'
import { fetchPostMeetingRange, fetchCreateUser } from '../adapters/index'




export const createMeetingRange = (body) => {
  return (dispatch) => {
    fetchPostMeetingRange(body).then(resp => {
      dispatch(setDateRange([resp.begin_date, resp.end_date]))
      dispatch(setIntervalTime(resp.interval))
      dispatch(setMeetingRangeId(resp.id))
    })
  }
}

export const setUserType = (userType) => {
  return {
    type: SET_USER_TYPE,
    payload: {
      userType
  }
}
}



export const createUser = (body) => {
  return (dispatch) => {
    fetchCreateUser(body).then(resp => {

      dispatch(setUserInformation({first_name: resp.first_name, last_name: resp.last_name, email: resp.email, user_id: resp.id}))
    })
  }
}

export const createMeetingTime = (body) => {
  return (dispatch) => {
    fetchCreateUser(body).then(resp => {
      console.log(resp)
      dispatch(setUserInformation({first_name: resp.first_name, last_name: resp.last_name, email: resp.email}))
    })
  }
}

export const setDateRange = (dateRange) => {
    return {
      type: SET_DATE_RANGE,
      payload: {
        dateRange
      }
    }
  }

export const setMeetingRangeId = (meetingRangeId) => {
    return {
      type: SET_MEETING_RANGE_ID,
      payload: {
        meetingRangeId
      }
    }
}


export const setUserInformation = (userInformation) => {
  return {
    type: SET_USER_INFORMATION,
    payload: {
      userInformation
    }
  }
}

export const setDatesWithTimes = (datesWithTimes) => {

  return {
    type: SET_DATES_WITH_TIMES,
    payload: {
      datesWithTimes
    }
  }
}

export const setIntervalTime = (interval) => {
  return {
    type: SET_INTERVAL_TIME,
    payload: {
      interval
    }
  }
}
