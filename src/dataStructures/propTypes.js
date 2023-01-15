import PropTypes from "prop-types";

const vigilPropType = PropTypes.shape({
  id: PropTypes.string,
  address: PropTypes.string,
  startTime: PropTypes.instanceOf(Date),
  endTime: PropTypes.instanceOf(Date),
  notes: PropTypes.string,
});

const discussionPropType = PropTypes.shape({
  id: PropTypes.string,
  dateCreated: PropTypes.string,
  name: PropTypes.string,
  pinned: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.shape), // this might break it?
});

export { vigilPropType, discussionPropType };
