import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, SelectField, HiddenField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sessions } from '../../api/session/Session';

const bridge = new SimpleSchema2Bridge(Sessions.schema);

/* Renders the EditContact page for editing a single document. */
const EditStudySession = () => {
  const user = Meteor.user();
  if (!user) {
    return <div>How did you get here?... Go Back</div>;
  }

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
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourString = hour.toString().padStart(2, '0');
        const minuteString = minute.toString().padStart(2, '0');
        const time = hourString + minuteString;
        options.push({ label: time, value: time });
      }
    }
    return options;
  };

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
    Sessions.collection.update(doc._id, { $set: { day, month, year, startTime, endTime, className, description } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Study Session</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <SelectField name="day" options={generateDayOptions()} placeholder="Choose..." />
                <SelectField name="month" options={generateMonthOptions()} placeholder="Choose..." />
                <SelectField name="year" options={generateYearOptions()} placeholder="Choose..." />
                <SelectField name="startTime" options={generateTimeOptions()} placeholder="Choose..." />
                <SelectField name="endTime" options={generateTimeOptions()} placeholder="Choose..." />
                <TextField name="className" placeholder="ex. ICS 314" />
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
  ) : <LoadingSpinner />;
};

export default EditStudySession;
