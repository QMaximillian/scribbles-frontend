import { SET_DATE_RANGE, SET_USER_INFORMATION, SET_DATES_WITH_TIMES } from '../actions/types'



export const initialState = {
    dateRange: [],
    userInformation: {}
}

export const scribbleReducer = (state = initialState, action) => {
  switch(action.type) {

  case SET_DATE_RANGE:
  return {
    ...state,
    dateRange: action.payload.dateRange
  }

  case SET_USER_INFORMATION:
  return {
    ...state,
    userInformation:  action.payload.userInformation
    }

  case SET_DATES_WITH_TIMES:
    return {
      ...state,
      datesWithTimes: action.payload.datesWithTimes
    }

    default:
      return state
  }

}
