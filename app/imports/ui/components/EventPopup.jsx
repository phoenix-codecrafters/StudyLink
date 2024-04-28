import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const EventPopup = ({ event, onClose }) => {
  // Convert the Date objects to string representations

  const startDate = event.start instanceof Date ? event.start.toString() : event.start;
  const endDate = event.end instanceof Date ? event.end.toString() : event.end;
  const description = event._def.extendedProps.description;

  // format time and date
  const day = startDate.slice(0, 10);
  const startTime = startDate.slice(16, 24);
  const endTime = endDate.slice(16, 24);

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Day: {day}</p>
        <p>Start: {startTime}</p>
        <p>End: {endTime}</p>
        <p>Description: {description}</p>
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
