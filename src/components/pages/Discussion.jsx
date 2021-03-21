import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderWithNav from '../navigation/nav-header';
import CreateThread from './createThread';
// import * as constants from '../../constants';
import Forum from './Forum';

export default function Discussion() {
  const isAdmin = useSelector((state) => state.user.user.isAdmin);

  // grabbing vigil information from constant events for now
  // const [vigils] = useState([constants.event1, constants.event2, constants.event3]);
  const storeDiscussions = useSelector((state) => state.discussions.discussions);
  console.log(storeDiscussions);

  // so for each discussion, make one of these forum links below: (instead of using the current vigils)

  const forumsPinned = storeDiscussions.map((d) => {
    if (d.pinned) {
      return ([
        <Row key={d.name} className="justify-content-md-center">
          <Forum title={d.name} backgroundColor={d.backgroundColor} docId={d.id} />
        </Row>,
      ]);
    }

    return null;
  });

  // sort the discussions by most recently created
  storeDiscussions.sort((a, b) => a.dateCreated - b.dateCreated);
  storeDiscussions.reverse();

  const forumsNotPinned = storeDiscussions.map((d) => {
    if (!d.pinned) {
      return ([
        <Row key={d.name} className="justify-content-md-center">
          <Forum title={d.name} backgroundColor={d.backgroundColor} docId={d.id} />
        </Row>,
      ]);
    }

    return null;
  });

  return (
    <div>
      <HeaderWithNav>Discussions</HeaderWithNav>
      <Link to="/discussion/PiIorC3YwcjdcKLhROCb">View Thread</Link>
      {isAdmin ? <CreateThread /> : null}
      <Container fluid>
        {forumsPinned}
        {forumsNotPinned}
      </Container>
    </div>
  );
}
