import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, SelectField, HiddenField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* Renders the EditContact page for editing a single document. */
const AdminEditProfile = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Profiles.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  const submit = (data) => {
    const { firstname, lastname, image, classStanding, major, score, description } = data;
    Profiles.collection.update(doc._id, { $set: { firstname, lastname, image, classStanding, major, score, description } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };
  return ready ? (
    <Container id="editprofile-page" className="py-3">
      <Row>
        <Col className="text-center"><h2>My Profile</h2></Col>
        <Container className="d-flex justify-content-center">
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField id="edit-first-name" type="text" name="firstname" label="First Name:" />
                    <TextField id="edit-last-name" type="text" name="lastname" label="Last Name:" />
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <Image className="pro-pic-image" src={doc.image} />
                  </Col>
                </Row>
                <TextField type="edit-text" name="image" label="Image Url:" placeholder="Image URL" />
                <SelectField id="class-standing" name="classStanding" label="Grade Status:" placeholder="Choose...">
                  options= {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']}
                </SelectField>
                <SelectField id="edit-major" label="Focus:" name="major" placeholder="Choose...">
                  options= {['Information and Computer Sciences (ICS)', 'Information Technology Management (ITM)', 'Computer Engineering']}
                </SelectField>
                <TextField id="score" type="text" name="score" label="Score:" />
                <LongTextField id="edit-description" as="textarea" name="description" label="Description:" placeholder="Tell us more about you" />
                <HiddenField name="owner" />
                <ErrorsField />
                <Row className="d-flex justify-content-end">
                  <SubmitField value="Submit" />
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
        </Container>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default AdminEditProfile;
