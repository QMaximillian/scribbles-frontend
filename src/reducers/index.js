export const initialState = {

  createRangeContainer: {
    meeting_range_id: 0,
    redirect: false,
    time: {
      beginDate: new Date(),
      endDate: new Date(),
      interval: 0,
    },
    user: {
      first_name: '',
      last_name: '',
      email: '',
      admin: '',
    }
  }
}

export const scribbleReducer = (state = initialState, action) => {
  switch(action.type) {

    default:
      return state
  }
}
