import moment from 'moment'

export const getDates = (startDate, stopDate) => {
  let dateArray = [];
  let currentDate = moment(startDate);
  let endDate = moment(stopDate);

  while (currentDate <= endDate) {
      dateArray.push(moment(currentDate).format())
      currentDate = moment(currentDate).add(1, 'days');
  }

  return dateArray;
}
