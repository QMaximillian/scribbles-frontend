import { SET_DATE_RANGE, SET_USER_INFORMATION, SET_DATES_WITH_TIMES } from './types'


export const setDateRange = (dateRange) => {
    return {
      type: SET_DATE_RANGE,
      payload: {
      dateRange
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
  console.log(datesWithTimes)
  return {
    type: SET_DATES_WITH_TIMES,
    payload: {
      datesWithTimes
    }
  }
}
