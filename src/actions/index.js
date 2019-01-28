import { CREATE_RANGE_FORM_TIME } from '../actions/types'

export const setBeginDate = (beginDate) => {
  return {
    type: CREATE_RANGE_FORM_TIME,
    payload: {
      beginDate: beginDate
    }
  }
}
