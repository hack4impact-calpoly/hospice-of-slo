import {
  INITIALIZE_DISCUSSIONS, ADD_DISCUSSION,
} from '../reduxConstants/index';

const initializeDiscussions = (discussions) => ({
  type: INITIALIZE_DISCUSSIONS,
  discussions,
});

const addDiscussion = (newDiscussion) => ({
  type: ADD_DISCUSSION,
  payload: { newDiscussion },
});

export default {
  initializeDiscussions,
  addDiscussion,
};
