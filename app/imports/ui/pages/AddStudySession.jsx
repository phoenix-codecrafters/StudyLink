import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, RadioField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Sessions } from '../../api/session/Session';

const bridge = new SimpleSchema2Bridge(Sessions.schema);

// Function to generate day options
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
  const currentYear = new Date().getFullYear();
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

/* Renders the AddStuff page for adding a document. */
const AddStudySession = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { day, month, year, startTime, endTime, className, ssOgh, description } = data;
    if (parseInt(endTime, 10) <= parseInt(startTime, 10)) {
      swal('Error', 'End time must be later than start time.', 'error');
      return;
    }
    let { ssAttend, ghAttend } = data;
    const owner = Meteor.user().username;
    if (ssOgh === 0) {
      ghAttend = [owner];
      ssAttend = [''];
    } else {
      ssAttend = [owner];
      ghAttend = [''];
    }
    Sessions.collection.insert(
      { day, month, year, startTime, endTime, className, description, ghAttend, ssAttend, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Study Session</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <SelectField name="month" options={generateMonthOptions()} placeholder="Choose..." />
                <SelectField name="day" options={generateDayOptions()} placeholder="Choose..." />
                <SelectField name="year" options={generateYearOptions()} placeholder="Choose..." />
                <SelectField name="startTime" options={generateTimeOptions()} placeholder="Choose..." />
                <SelectField name="endTime" options={generateTimeOptions()} placeholder="Choose..." />
                <TextField name="className" placeholder="ex. ICS 314" />
                <RadioField
                  name="ssOgh"
                  label="Choose:"
                  options={[
                    { label: 'Grasshopper', value: 0 },
                    { label: 'Sensei', value: 1 },
                  ]}
                />
                <LongTextField name="description" placeholder="Anything else you would like to specify." />
                <HiddenField name="ghAttend" value="" />
                <HiddenField name="ssAttend" value="" />
                <HiddenField name="owner" value="username" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStudySession;
