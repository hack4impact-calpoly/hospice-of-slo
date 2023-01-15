import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/firestore";
import { discussionPropType } from "../../../dataStructures/propTypes";
import actions from "../../../actions";
import DiscussionModal from "./DiscussionModal";
import { FloatingActionButton } from "../../../styled-components/discussion-components";

export default function CreateThread(props) {
  const { discussion, show, setShow, isEditing } = props;
  const [title, setTitle] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Redux setup
  const dispatch = useDispatch();

  async function discussionPress() {
    // creates a new discussion
    const db = firebase.firestore();
    const discussions = db.collection("discussions");
    if (isEditing) {
      // editing a Discussion name
      discussions
        .doc(discussion.id)
        .update({
          name: title,
        })
        .then(() => {
          handleClose();
          dispatch(
            actions.discussions.editDiscussion(discussion.id, {
              ...discussion,
              name: title,
            })
          );
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      // creating a Discussion
      const newDiscussion = {
        name: title,
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(), // time stamp
        pinned: true, // pinned is true by default when manual discussion is created.
      };
      discussions
        .add(newDiscussion)
        .then((backRef) => {
          dispatch(
            actions.discussions.addDiscussion({
              ...newDiscussion,
              id: backRef.id,
              messages: [],
            })
          );
          handleClose();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  }

  const discussFunc = useCallback(() => {
    discussionPress();
  }, [discussionPress]);

  return (
    <>
      {isEditing ? null : (
        <FloatingActionButton onClick={handleShow}>+</FloatingActionButton>
      )}
      <DiscussionModal
        show={show}
        handleClose={handleClose}
        isEditing={isEditing}
        setTitle={setTitle}
        discussion={discussion}
        discussionPress={discussFunc}
      />
    </>
  );
}

CreateThread.propTypes = {
  discussion: discussionPropType,
  isEditing: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

CreateThread.defaultProps = {
  discussion: {},
  isEditing: false,
};
