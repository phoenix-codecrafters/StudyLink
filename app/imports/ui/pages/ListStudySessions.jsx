import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sessions } from '../../api/session/Session';
import StudySession from '../components/StudySession';

const ListStudySessions = () => {
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
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2 className="page-title">List Study Sessions</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {sessions.map((session) => (
              <Col key={session._id}>
                <StudySession
                  studySession={session}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStudySessions;
