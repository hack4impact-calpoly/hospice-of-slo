import {
  INITIALIZE_DISCUSSIONS,
  ADD_DISCUSSION,
  EDIT_DISCUSSION,
  DELETE_DISCUSSION,
} from "../reduxConstants/index";

const initializeDiscussions = (discussions) => ({
  type: INITIALIZE_DISCUSSIONS,
  discussions,
});

const addDiscussion = (newDiscussion) => ({
  type: ADD_DISCUSSION,
  payload: { newDiscussion },
});

const editDiscussion = (oldDiscussionId, newDiscussion) => ({
  type: EDIT_DISCUSSION,
  payload: { oldDiscussionId, newDiscussion },
});

const deleteDiscussion = (oldDiscussionId) => ({
  type: DELETE_DISCUSSION,
  payload: { oldDiscussionId },
});

export default {
  initializeDiscussions,
  addDiscussion,
  editDiscussion,
  deleteDiscussion,
};
