import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Modal } from 'react-bootstrap';
import { AutoForm, RadioField, SubmitField } from 'uniforms-bootstrap5';
import { Sessions } from '../../api/session/Session';
import LoadingSpinner from './LoadingSpinner';

const EventPopup = ({ event, onClose }) => {
  // get current day for rsvp disable
  const currDate = new Date();
  // Convert the Date objects to string representations
  const description = event._def.extendedProps.description;

  // format time and date
  const month = event.start.getMonth();
  const day = event.start.getDay();
  const startTime = event.start.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
  });
  const endTime = event.end.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
  });

  const rsvpSchema = new SimpleSchema({
    ssOgh: Number,
  });

  const bridge = new SimpleSchema2Bridge(rsvpSchema);

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

  const rsvp = (data) => {
    const { ssOgh } = data;
    const username = user.username;
    let inAttend = false;
    doc.ghAttend.forEach(attendee => {
      if (attendee === username) {
        inAttend = true;
      }
    });
    doc.ssAttend.forEach(attendee => {
      if (attendee === username) {
        inAttend = true;
      }
    });
    if (!inAttend && ssOgh === 0) {
      const ghAttend = [...doc.ghAttend, username];
      Sessions.collection.update(doc._id, { $set: { ghAttend } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'You have RSVP\'d to this session', 'success')));
    } else if (!inAttend && ssOgh === 1) {
      const ssAttend = [...doc.ssAttend, username];
      Sessions.collection.update(doc._id, { $set: { ssAttend } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'You have RSVP\'d to this session', 'success')));
    } else {
      swal('You are already attending this session!');
    }

  };

  return ready ? (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Month:</strong> {month}</p>
        <p><strong>Day:</strong> {day}</p>
        <p><strong>Start:</strong> {startTime}</p>
        <p><strong>End:</strong> {endTime}</p>
        <p><strong>Description:</strong> <br /> {description}</p>
        <p><strong>Sensei Students:</strong> {doc.ssAttend.join(', ').split(',').map((attendee, index) => (
          <React.Fragment key={index}>
            <br />
            {attendee.trim()}
          </React.Fragment>
        ))}
        </p>
        <p><strong>Grasshopper Students:</strong> {doc.ghAttend.join(', ').split(',').map((attendee, index) => (
          <React.Fragment key={index}>
            <br />
            {attendee.trim()}
          </React.Fragment>
        ))}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <AutoForm schema={bridge} onSubmit={data => rsvp(data)}>
          <div className="d-flex">
            {currDate > event.start ? (
              <>
                <div className="form-check-label pr-3" style={{ marginTop: '1rem', paddingRight: '1rem', color: 'palevioletred' }}>UNAVAILABLE: </div>
                <div>
                  <RadioField
                    style={{ marginTop: '1rem', color: 'palevioletred' }}
                    name="ssOgh"
                    label=""
                    inline
                    options={[
                      { label: 'Grasshopper', value: 0 },
                      { label: 'Sensei', value: 1 },
                    ]}
                    disabled
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-check-label pr-3" style={{ marginTop: '1rem', paddingRight: '1rem' }}>Choose: </div>
                <div>
                  <RadioField
                    style={{ marginTop: '1rem' }}
                    name="ssOgh"
                    label=""
                    inline
                    options={[
                      { label: 'Grasshopper', value: 0 },
                      { label: 'Sensei', value: 1 },
                    ]}
                  />
                </div>
              </>
            )}
            <div className="d-flex align-items-center">
              <SubmitField inputClassName="swal-button swal-button--confirm" name="Submit">RSVP</SubmitField>
            </div>
          </div>
        </AutoForm>
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
      }).isRequired,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EventPopup;
