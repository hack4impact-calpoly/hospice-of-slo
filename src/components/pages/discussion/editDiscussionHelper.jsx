import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { discussionPropType } from '../../../dataStructures/propTypes';
import actions from '../../../actions';

export default function EditHelper(props) {
  const { isPinning, isDeleting, discussion } = props;
  const pin = discussion.pinned ? 'unpin' : 'pin';

  const dispatch = useDispatch();

  const db = firebase.firestore();
  const discussions = db.collection('discussions');
  async function discussionPress() {
    if (isPinning) { // editing a Discussion
      discussions.doc(discussion.id)
        .update({
          pinned: !(discussion.pinned),
        })
        .then(() => {
          dispatch(actions.discussions.editDiscussion(discussion.id, { ...discussion, pinned: !(discussion.pinned) }));
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
    if (isDeleting) {
      // Deletes Messages Subcollection
      const messages = await discussions.doc(discussion.id).collection('messages');
      messages.get().then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          discussions.doc(discussion.id).collection('messages').doc(doc.id).delete();
        });
      });

      // Deletes the discussion collection
      discussions.doc(discussion.id)
        .delete()
        .then(() => {
          dispatch(actions.discussions.deleteDiscussion(discussion.id));
        })
        .catch((error) => {
          console.error('Error deleting document: ', error);
        });
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={discussionPress}
      onClick={discussionPress}
    >
      {isPinning ? pin : 'delete'}
    </div>
  );
}

EditHelper.propTypes = {
  isPinning: PropTypes.bool,
  isDeleting: PropTypes.bool,
  discussion: discussionPropType,
};

EditHelper.defaultProps = {
  isPinning: false,
  isDeleting: false,
  discussion: {},
};
