import React from 'react';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* Renders the EditContact page for editing a single document. */
const Profile = () => {
  const user = Meteor.user();

  if (!user) {
    return <div>How did you get here?... Go Back</div>;
  }
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Profiles.collection.find({ owner: user.username }).fetch();
    return {
      doc: document[0],
      ready: rdy,
    };
  });
  // console.log('EditContact', doc, ready);
  return ready ? (
    <Container className="py-3">
      <Row>
        <Col className="text-center"><h2>My Profile</h2></Col>
        <Container className="d-flex justify-content-center">
          <AutoForm schema={bridge} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField type="text" name="firstname" label="First Name:" disabled />
                    <TextField type="text" name="lastname" label="Last Name:" disabled />
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <Image className="pro-pic-image" src={doc.image} />
                  </Col>
                </Row>
                <TextField type="text" name="image" label="Image Url:" placeholder="Image URL" disabled />
                <SelectField name="classStanding" label="Grade Status:" placeholder="Choose..." disabled>
                  options= {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']}
                </SelectField>
                <SelectField label="Focus:" name="major" placeholder="Choose..." disabled>
                  options= {['Information and Computer Sciences (ICS)', 'Information Technology Management (ITM)', 'Computer Engineering']}
                </SelectField>
                <LongTextField as="textarea" name="description" label="Description:" placeholder="Tell us more about you" disabled />
                <ErrorsField />
                <Row className="d-flex justify-content-end">
                  <Link to="/editprofile">
                    <SubmitField value="Edit" />
                  </Link>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
        </Container>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Profile;
