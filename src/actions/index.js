import { SET_DATE_RANGE } from './types'
import { SET_USER_INFORMATION } from './types'

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
