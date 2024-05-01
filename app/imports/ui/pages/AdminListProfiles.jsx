import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';
import ProfileAdmin from '../components/ProfileAdmin';

const AdminListProfiles = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Sessions documents.
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Sessions documents
    const profileCollection = Profiles.collection.find({}).fetch();
    return {
      profiles: profileCollection,
      ready: rdy,
    };
  });
  console.log(profiles);
  return (
    ready ? (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h2 className="mb-5">List All Profiles</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {profiles.map((profile) => (
                <Col xs={12} sm={6} md={4} lg={3} key={profile._id}>
                  <ProfileAdmin
                    profile={profile}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />);
};

export default AdminListProfiles;
