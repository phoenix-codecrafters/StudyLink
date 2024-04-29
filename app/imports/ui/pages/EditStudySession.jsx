import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, SelectField, HiddenField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Sessions } from '../../api/session/Session';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Sessions.schema);

// Define option generating functions if not already defined
const generateDayOptions = () => Array.from({ length: 31 }, (_, i) => ({ label: String(i + 1), value: i + 1 }));
const generateMonthOptions = () => Array.from({ length: 12 }, (_, i) => ({ label: String(i + 1), value: i + 1 }));
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => ({ label: String(currentYear + i), value: currentYear + i }));
};
const generateTimeOptions = () => Array.from({ length: 24 }, (_, i) => ({ label: `${i}:00`, value: `${i}:00` }));

const EditStudySession = () => {
  const user = Meteor.user();

  if (!user) {
    return <div>Unauthorized access. Please log in.</div>;
  }

  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    return {
      doc: Sessions.collection.findOne({ owner: user.username }),
      ready: subscription.ready(),
    };
  });

  const submit = (data) => {
    Sessions.collection.update(doc._id, { $set: data }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Session updated successfully', 'success');
      }
    });
  };

  if (!ready) return <LoadingSpinner />;

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">Edit Study Session</h2>
          <AutoForm schema={bridge} model={doc} onSubmit={submit}>
            <Card>
              <Card.Body>
                <TextField id="edit-className" name="className" placeholder="Class Name" />
                <SelectField name="day" options={generateDayOptions()} placeholder="Day" />
                <SelectField name="month" options={generateMonthOptions()} placeholder="Month" />
                <SelectField name="year" options={generateYearOptions()} placeholder="Year" />
                <SelectField name="startTime" options={generateTimeOptions()} placeholder="Start Time" />
                <SelectField name="endTime" options={generateTimeOptions()} placeholder="End Time" />
                <LongTextField name="description" placeholder="Session Description" />
                <HiddenField name="ghAttend" />
                <HiddenField name="ssAttend" />
                <HiddenField name="owner" value={Meteor.user().username} />
                <SubmitField value="Update Session" />
                <ErrorsField />
                <Row className="d-flex justify-content-end">
                  <SubmitField value="Submit" />
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditStudySession;
