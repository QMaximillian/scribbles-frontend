import { SET_RANGE_INFORMATION } from '../actions/types'

export const initialState = {
}

export const initialRangeState = {

}

export const createRangeReducer = (state = initialRangeState, action) => {
  switch(action.type) {

    case SET_RANGE_INFORMATION:
    return {
      ...state,
      begin_date: action.payload.begin_date,
      end_date: action.payload.end_date,
      interval: action.payload.interval,
      first_name: action.payload.first_name,
      last_name: action.payload.last_name,
      email: action.payload.email
    }

    default:
      return state
  }
}
