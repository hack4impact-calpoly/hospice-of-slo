import {
    INITIALIZE_SHIFTS,
    ADD_SHIFT,
    EDIT_SHIFT,
    DELETE_SHIFT,
  } from "../reduxConstants/index";
  
  const initializeShifts = (shift) => ({
    type: INITIALIZE_SHIFTS,
    shift,
  });
  
  const addShift = (newShift) => ({
    type: ADD_SHIFT,
    payload: { newShift },
  });
  
  const editShift = (oldShiftId, newShift) => ({
    type: EDIT_SHIFT,
    payload: { oldShiftId, newShift },
  });
  
  const deleteShift = (oldShiftId) => ({
    type: DELETE_SHIFT,
    payload: { oldShiftId },
  });
  
  export default {
    initializeShifts,
    addShift,
    editShift,
    deleteShift,
  };
  