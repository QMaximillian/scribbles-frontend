import { SET_DATE_RANGE } from './types'

export const setDateRange = (dateRange) => {
  return {
    type: SET_DATE_RANGE,
    payload: {
      dateRange: dateRange
    }
  }
}
