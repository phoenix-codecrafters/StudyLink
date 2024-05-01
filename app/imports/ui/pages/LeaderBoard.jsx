import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';
import { Sessions } from '../../api/session/Session';
import PersonItem from '../components/PersonItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all the score documents. Use <PersonItem> to render each row. */
const LeaderBoard = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles, sessions } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to score documents.
    const subscription1 = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Sessions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready();
    // Get the score documents
    const profileItems = Profiles.collection.find().fetch();
    const sessionItems = Sessions.collection.find().fetch();
    return {
      profiles: profileItems,
      sessions: sessionItems,
      ready: rdy,
    };
  }, []);

  // update points
  const currentDate = new Date();
  // Loop through each session
  sessions.forEach(session => {
    const endHours = Math.floor(session.endTime / 100);
    const endMinutes = session.endTime % 100;
    const endDate = new Date(session.year, session.month - 1, session.day, endHours, endMinutes);
    if (currentDate > endDate) {
      Sessions.collection.update(session._id, { $set: { isComplete: true } });
    }
    if (session.pointsAssign === false && session.isComplete === true) {
      // Assuming `ghAttend` and `ssAttend` are arrays of user IDs
      const ghAttendUsers = session.ghAttend;
      const ssAttendUsers = session.ssAttend;

      // Logic for assigning points to `ghAttendUsers` array
      ghAttendUsers.forEach(userId => {
        const eachProfile = profiles.find(profile => profile.owner === userId);
        Profiles.collection.update({ _id: eachProfile._id }, { $inc: { score: 2 } }); // Increment points by 2
      });

      // Logic for assigning points to `ssAttendUsers` array
      ssAttendUsers.forEach(userId => {
        const eachProfile = profiles.find(profile => profile.owner === userId);
        Profiles.collection.update({ _id: eachProfile._id }, { $inc: { score: 3 } }); // Increment points by 3
      });

      // Mark session as points assigned
      Sessions.collection.update({ _id: session._id }, { $set: { pointsAssign: true } });
    }
  });

  return (ready ? (
    <Container id="leaderboard-page" className="py-3">
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
