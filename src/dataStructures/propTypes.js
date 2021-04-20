import PropTypes from 'prop-types';

const eventPropType = PropTypes.shape({
  id: PropTypes.string,
  address: PropTypes.string,
  dates: PropTypes.arrayOf(PropTypes.string),
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  notes: PropTypes.string,
});

const discussionPropType = PropTypes.shape({
  id: PropTypes.string,
  dateCreated: PropTypes.t,
  name: PropTypes.string,
  pinned: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.object),
});

export default eventPropType;
export { discussionPropType };
