import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sessions } from '../../api/session/Session';
import StudySessionAdmin from '../components/StudySessionAdmin';

const AdminListStudySessions = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, sessions } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Sessions documents.
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Sessions documents
    const sessionItems = Sessions.collection.find({}).fetch();
    return {
      sessions: sessionItems,
      ready: rdy,
    };
  });

  return (
    ready ? (
      <Container className="py-3" style={{ fontFamily: 'Concert One, sans-serif' }}>
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h2 className="mb-5">List All Study Sessions</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {sessions.length === 0 ? (
                <Container id="no-sessions-box"><h3>You currently don&apos;t own any sessions.</h3></Container>
              ) : (
                sessions.map((session) => (
                  <Col key={session._id}>
                    <StudySessionAdmin
                      studySession={session}
                    />
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />);
};

export default AdminListStudySessions;
