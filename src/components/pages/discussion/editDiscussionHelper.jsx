import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { discussionPropType } from '../../../dataStructures/propTypes';

export default function EditHelper(props) {
  const { isPinning, isDeleting, discussion } = props;
  const pin = discussion.pinned ? 'unpin' : 'pin';

  const db = firebase.firestore();
  const discussions = db.collection('discussions');
  async function discussionPress() {
    if (isPinning) { // editing a Discussion name
      discussions.doc(discussion.id)
        .update({
          pinned: !(discussion.pinned),
        })
        .then(() => {
          console.log('Document successfully updated');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
    if (isDeleting) {
      discussions.doc(discussion.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted');
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
