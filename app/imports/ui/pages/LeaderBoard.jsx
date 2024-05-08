import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';
import PersonItem from '../components/PersonItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all the score documents. Use <PersonItem> to render each row. */
const LeaderBoard = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to score documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the score documents
    const profileItems = Profiles.collection.find().fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="leaderboard-page" className="py-3" style={{ fontFamily: 'Concert One, sans-serif' }}>
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Leaderboard</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Major</th>
              </tr>
            </thead>
            <tbody>
              {profiles
                .slice() // Create a shallow copy of the array to avoid mutating the original array
                .sort((a, b) => b.score - a.score) // Sort the array based on the score property
                .map((score, index) => (
                  <PersonItem key={`${score._id}_${index}`} profile={score} rank={index + 1} />
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default LeaderBoard;
