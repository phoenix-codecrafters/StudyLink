import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import { Sessions } from '../../api/session/Session';
import LoadingSpinner from './LoadingSpinner';

const EventPopup = ({ event, onClose }) => {
  // Convert the Date objects to string representations
  const startDate = event.start instanceof Date ? event.start.toString() : event.start;
  const endDate = event.end instanceof Date ? event.end.toString() : event.end;
  const description = event._def.extendedProps.description;

  // format time and date
  const day = startDate.slice(0, 10);
  const startTime = startDate.slice(16, 24);
  const endTime = endDate.slice(16, 24);

  const user = Meteor.user();

  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Sessions.collection.find({ _id: event.id }).fetch();
    return {
      doc: document[0],
      ready: rdy,
    };
  });

  const rsvp = () => {
    const username = user.username;
    let inAttend = false;
    doc.ghAttend.forEach(attendee => {
      if (attendee === username) {
        inAttend = true;
      }
    });
    if (inAttend) {
      swal('You are already attending this session!');
    } else {
      const ghAttend = [...doc.ghAttend, username];
      Sessions.collection.update(doc._id, { $set: { ghAttend } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'You have RSVP\'d to this session', 'success')));
    }
  };

  return ready ? (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Day: {day}</p>
        <p>Start: {startTime}</p>
        <p>End: {endTime}</p>
        <p>Description: {description}</p>
        <p>Sensei Students: </p>
        <p>Grasshopper Students: {doc.ghAttend.join(', ')} </p>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ backgroundColor: 'rgb(124, 209, 249)', borderColor: 'rgb(124, 209, 249)' }} onClick={rsvp}>RSVP</Button>
      </Modal.Footer>
    </Modal>
  ) : <LoadingSpinner />;
};

EventPopup.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    start: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    end: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    _def: PropTypes.shape({
      extendedProps: PropTypes.shape({
        description: PropTypes.string.isRequired,
        // Add more specific PropTypes for other properties if necessary
      }).isRequired,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EventPopup;
