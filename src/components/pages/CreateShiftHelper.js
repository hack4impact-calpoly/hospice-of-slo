/* eslint-disable prefer-destructuring */

// Validation
function timeComesBefore(time1, time2) {
  const [hour1, minute1] = time1.split(':', 2);
  const [hour2, minute2] = time2.split(':', 2);
  if (parseInt(hour1, 10) < parseInt(hour2, 10)) {
    return true;
  }
  if (parseInt(hour1, 10) > parseInt(hour2, 10)) {
    return false;
  }

  return parseInt(minute1, 10) < parseInt(minute2, 10);
}

function dateComesBefore(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1 < d2;
}

// On Submit Helpers
function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function getDateRange(startDate, endDate) {
  const curDate = new Date(startDate);
  const stopDate = new Date(endDate);
  const dates = [];
  while (curDate <= stopDate) {
    dates.push(formatDate(curDate));
    curDate.setDate(curDate.getDate() + 1);
  }
  return dates;
}

// Editing Helper
function eventDataToFront(event) {
  const { dates, ...eventCopy } = event;
  if (dates.length === 1) {
    eventCopy.date = dates[0];
    eventCopy.repeats = false;
    eventCopy.endRepeatDate = '';
  } else {
    eventCopy.date = dates[0];
    eventCopy.repeats = true;
    eventCopy.endRepeatDate = dates[dates.length - 1];
  }
  return eventCopy;
}

export {
  timeComesBefore, dateComesBefore, getDateRange, eventDataToFront,
};
