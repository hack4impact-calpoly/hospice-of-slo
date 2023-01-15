import {
  INITIALIZE_USER,
  ADD_SHIFT,
  DELETE_SHIFT,
} from "../reduxConstants/index";

const initializeUser = (user) => ({
  type: INITIALIZE_USER,
  user,
});

const addShift = (newShift) => ({
  type: ADD_SHIFT,
  payload: { newShift },
});

const deleteShift = (oldShiftId) => ({
  type: DELETE_SHIFT,
  payload: { oldShiftId },
});

export default {
  initializeUser,
  addShift,
  deleteShift,
};
