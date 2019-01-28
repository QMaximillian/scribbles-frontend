import {
  CREATE_RANGE_FORM_TIME, CREATE_RANGE_FORM_USER, SET_RANGE, SET_TIMES } from '../actions/types'


export const initialState = {
  form: {
  },
}

export const rangeFormUserReducer = (state = initialState, action) => {
  switch(action.type) {

    case CREATE_RANGE_FORM_USER:
    return {
       user: {
        ...state,
        first_name: action.payload.first_name
      }
    }

    default:
      return state
  }
}
