import { SET_DATE_RANGE, SET_USER_INFORMATION, SET_DATES_WITH_TIMES, SET_INTERVAL_TIME, SET_MEETING_RANGE_ID } from './types'
import { fetchPostMeetingRange, fetchCreateUser } from '../adapters/index'


export const setDateRange = (dateRange) => {
    return {
      type: SET_DATE_RANGE,
      payload: {
        dateRange
      }
    }
  }

export const createMeetingRange = (body) => {
  return (dispatch) => {
    fetchPostMeetingRange(body).then(resp => {
      dispatch(setDateRange([resp.begin_date, resp.end_date]))
      dispatch(setIntervalTime(resp.interval))
      dispatch(setMeetingRangeId(resp.id))
    })
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

export const createUser = (body) => {
  return (dispatch) => {
    fetchCreateUser(body).then(resp => {
      dispatch(setUserInformation(resp))
    })
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
  console.log(datesWithTimes)
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
