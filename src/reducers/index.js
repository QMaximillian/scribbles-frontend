import { SET_DATE_RANGE } from '../actions/types'

export const initialState = {
  current: {},
  dateRange: []
}

export const scribbleReducer = (state = initialState, action) => {
  switch(action.type) {

  case SET_DATE_RANGE:
  return {
    ...state,
    dateRange: action.payload.dateRange
  }

    default:
      return state
  }
}
