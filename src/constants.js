/* eslint-disable import/prefer-default-export */
export const colors = {
  Blue: '#8FCBD4',
  Purple: '#D0CAEB',
};

// Dummy Data for Dates, eventually should be removed
const curMonth = (new Date()).getMonth();
const curDay = (new Date()).getDate();

export const event1 = {
  title: '100 Apple Drive',
  start: new Date(2021, curMonth, curDay, 8),
  end: new Date(2021, curMonth, curDay, 15),
  backgroundColor: colors.Blue,
};
export const event2 = {
  title: '200 Kiwi Lane',
  start: new Date(2021, curMonth, curDay, 8),
  end: new Date(2021, curMonth, curDay, 11),
  backgroundColor: colors.Purple,
};
export const event3 = {
  title: '100 Apple Drive',
  start: new Date(2021, curMonth, curDay + 1, 8),
  end: new Date(2021, curMonth, curDay + 1, 11),
  backgroundColor: colors.Blue,
};
