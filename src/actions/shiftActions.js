import { INITIALIZE_SHIFTS } from "../reduxConstants/index";

const initializeShifts = (shifts) => ({
  type: INITIALIZE_SHIFTS,
  shifts,
});

export default {
  initializeShifts,
};
