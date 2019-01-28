import { SET_RANGE_INFORMATION } from '../actions/types'

export const setRangeInformation = ({ begin_date, end_date, interval, first_name, last_name, email }) => {
  return {
    type: SET_RANGE_INFORMATION,
    payload: {
      begin_date,
      end_date,
      interval,
      first_name,
      last_name,
      email
    }
  }
}
