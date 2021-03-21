import { INITIALIZE_DISCUSSIONS } from '../reduxConstants/index';

const initializeDiscussions = (discussions) => ({
  type: INITIALIZE_DISCUSSIONS,
  discussions,
});

export default {
  initializeDiscussions,
};
