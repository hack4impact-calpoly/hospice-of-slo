import { INITIALIZE_HISTORY } from '../reduxConstants/index';

const initializeHistory = (historyShifts) => ({
  type: INITIALIZE_HISTORY,
  historyShifts,
});

export default {
  initializeHistory,
};
