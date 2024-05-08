import React, { useState } from 'react';
import swal from 'sweetalert';
import { Navigate } from 'react-router-dom';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, SelectField, HiddenField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* Renders the EditContact page for editing a single document. */
const EditProfile = ({ location }) => {
  const user = Meteor.user();
  const [redirectToReferer, setRedirectToRef] = useState(false);

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
  const submit = (data) => {
    const { firstname, lastname, image, classStanding, major, description } = data;
    Profiles.collection.update(doc._id, { $set: { firstname, lastname, image, classStanding, major, description } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
        setRedirectToRef(true);
      }
    });
  };
  const { from } = location?.state || { from: { pathname: '/profile' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return ready ? (
    <Container id="editprofile-page" className="py-3" style={{ fontFamily: 'Concert One, sans-serif' }}>
      <Row>
        <Container className="d-flex justify-content-center">
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <h2 className="text-center">Edit Profile</h2>
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
                <LongTextField id="edit-description" as="textarea" name="description" label="Description:" placeholder="Tell us more about you" />
                <ErrorsField />
                <Row className="d-flex justify-content-end">
                  <SubmitField value="Submit" />
                </Row>
                <HiddenField name="score" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Container>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

EditProfile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

EditProfile.defaultProps = {
  location: { state: '' },
};

export default EditProfile;
