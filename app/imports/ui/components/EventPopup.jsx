import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const EventPopup = ({ event, onClose }) => {
  // Convert the Date objects to string representations
  const startDate = event.start instanceof Date ? event.start.toISOString() : event.start;
  const endDate = event.end instanceof Date ? event.end.toISOString() : event.end;

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Start: {startDate}</p>
        <p>End: {endDate}</p>
        {/* Add more event details here as needed */}
      </Modal.Body>
    </Modal>
  );
};

EventPopup.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    start: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    end: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    // Add more specific PropTypes for other properties if necessary
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EventPopup;
