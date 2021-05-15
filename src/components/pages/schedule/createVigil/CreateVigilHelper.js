import moment from 'moment';

// Validation
function timeComesBefore(time1, time2) {
  const timeFormat = 'HH:mm';
  return moment(time1, timeFormat).isSameOrBefore(moment(time2, timeFormat));
}

function dateComesBefore(date1, date2) {
  return new Date(date1) <= new Date(date2);
}

// On Submit Helpers
function combineDateAndTime(date, time) {
  const format = date.replace(/-/g, '/');
  return new Date(`${format} ${time}`);
}

// Editing Helper
function eventDataToFront(event) {
  const { ...eventCopy } = event;
  eventCopy.startDate = moment(event.startTime).format('YYYY-MM-DD');
  eventCopy.endDate = moment(event.endTime).format('YYYY-MM-DD');
  eventCopy.startTime = moment(event.startTime).format('HH:mm');
  eventCopy.endTime = moment(event.endTime).format('HH:mm');
  return eventCopy;
}

export {
  timeComesBefore, dateComesBefore, combineDateAndTime, eventDataToFront,
};
