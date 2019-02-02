import { SET_DATE_RANGE } from '../actions/types'
import { SET_USER_INFORMATION } from '../actions/types'

export const initialState = {
  current: {},
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
    userInformation: action.payload.userInformation
  }

    default:
      return state
  }
}
