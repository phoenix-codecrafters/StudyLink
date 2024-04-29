import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';

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
        <p>fdsa</p>
      </Container>
    ) : <LoadingSpinner />);
};

export default AdminListProfiles;
