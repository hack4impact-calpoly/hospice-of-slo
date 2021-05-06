import {
  INITIALIZE_HISTORY, ADD_HISTORY_SHIFT, DELETE_HISTORY_SHIFT,
} from '../reduxConstants/index';

const initializeHistory = (historyShifts) => ({
  type: INITIALIZE_HISTORY,
  historyShifts,
});

const addHistoryShift = (newShift) => ({
  type: ADD_HISTORY_SHIFT,
  payload: { newShift },
});

const deleteHistoryShift = (oldShiftId) => ({
  type: DELETE_HISTORY_SHIFT,
  payload: { oldShiftId },
});

export default {
  initializeHistory,
  addHistoryShift,
  deleteHistoryShift,
};
