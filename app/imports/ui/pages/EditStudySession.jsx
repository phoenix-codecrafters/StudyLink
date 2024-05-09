import React, { useState } from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, SelectField, HiddenField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sessions } from '../../api/session/Session';

const bridge = new SimpleSchema2Bridge(Sessions.schema);

// Function to generate day options
const currentDate = new Date();
const generateDayOptions = () => {
  const options = [];
  for (let day = 1; day <= 31; day++) {
    options.push({ label: day.toString(), value: day });
  }
  return options;
};

// Function to generate month options
const generateMonthOptions = () => {
  const options = [];
  for (let month = 1; month <= 12; month++) {
    options.push({ label: month.toString(), value: month });
  }
  return options;
};

// Function to generate year options
const generateYearOptions = () => {
  const options = [];
  const currentYear = currentDate.getFullYear();
  for (let year = currentYear; year <= currentYear + 5; year++) {
    options.push({ label: year.toString(), value: year });
  }
  return options;
};

// Function to generate time options with 30-minute increments
const generateTimeOptions = () => {
  const options = [];
  const addZero = num => (num < 10 ? `0${num}` : num); // Helper function to add leading zero

  // Loop through hours from 8 AM to 8 PM (inclusive)
  for (let hour = 8; hour <= 20; hour++) {
    const isPM = hour >= 12;
    const displayHour = isPM ? hour - 12 : hour; // Convert to 12-hour format
    const suffix = isPM ? 'PM' : 'AM';

    // Generate times in 30-minute increments
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = displayHour === 0 ? 12 : displayHour; // Display hour should be 12 for 0
      const formattedMinute = addZero(minute); // Ensure minutes are in "00" or "30" format

      // Calculate numeric value representing the time
      const numericTime = (hour * 100) + minute;

      // Generate the time label in 12-hour format with AM/PM
      const timeLabel = `${formattedHour}:${formattedMinute} ${suffix}`;

      // Push option with label and numeric value
      options.push({ label: timeLabel, value: numericTime });
    }
  }
  return options;
};

/* Renders the EditContact page for editing a single document. */
const EditStudySession = ({ location }) => {
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Sessions.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  const submit = (data) => {
    const { day, month, year, startTime, endTime, className, description } = data;
    Sessions.collection.update(doc._id, { $set: { day, month, year, startTime, endTime, className, description } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Session updated successfully', 'success');
        setRedirectToRef(true);
      }
    });
  };
  const { from } = location?.state || { from: { pathname: '/mystudysessions' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return ready ? (
    <Container className="py-3" style={{ fontFamily: 'Concert One, sans-serif' }}>
      <Row className="justify-content-center">
        <Col xs={5}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <h2 className="text-center">Edit Study Session</h2>
                <SelectField name="day" options={generateDayOptions()} placeholder="Choose..." />
                <SelectField name="month" options={generateMonthOptions()} placeholder="Choose..." />
                <SelectField name="year" options={generateYearOptions()} placeholder="Choose..." />
                <SelectField name="startTime" options={generateTimeOptions()} placeholder="Choose..." />
                <SelectField name="endTime" options={generateTimeOptions()} placeholder="Choose..." />
                <TextField name="className" placeholder="ex. ICS 314" />
                <LongTextField name="description" placeholder="Anything else you would like to specify." />
                <HiddenField name="ghAttend" value="" />
                <HiddenField name="ssAttend" value="" />
                <HiddenField name="isComplete" />
                <HiddenField name="pointsAssign" value={doc.pointsAssign || 0} />
                <HiddenField name="owner" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

EditStudySession.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

EditStudySession.defaultProps = {
  location: { state: '' },
};

export default EditStudySession;
