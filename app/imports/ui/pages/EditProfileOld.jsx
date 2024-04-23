import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row, Image } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import { Navigate } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';

const EditProfileOld = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const user = Meteor.user();

  if (!user) {
    return <div>How did you get here?... Go Back</div>;
  }

  const schema = new SimpleSchema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    image: String,
    classStanding: {
      type: String,
      allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'],
    },
    major: {
      type: String,
      allowedValues: ['Information and Computer Sciences (ICS)', 'Information Technology Management (ITM)', 'Computer Engineering'],
    },
    description: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, firstname, lastname, image, classStanding, major, description } = doc;
    const profile = { firstname: firstname, lastname: lastname, image: image, classStanding: classStanding, major: major, description: description };
  };

  const { from } = location?.state || { from: { pathname: '/add' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  const handleSubmit = (data) => {
    submit(data);
  };

  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="text-center">
            <h2>Edit Profile</h2>
          </div>
          <AutoForm schema={bridge} onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField type="email" name="email" label="E-Mail:" value={user.emails[0].address} placeholder="E-mail address" />
                    <TextField type="password" name="password" label="Password:" value="**********" placeholder="Password" disabled />
                  </Col>
                  <Col xs={4} className="d-flex justify-content-center">
                    <Image className="pro-pic-image" src={user.profile.image} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField type="text" name="firstname" label="First Name:" value={user.profile.firstname} placeholder="First Name" />
                  </Col>
                  <Col>
                    <TextField type="text" name="lastname" label="Last Name:" value={user.profile.lastname} placeholder="Last Name" />
                  </Col>
                </Row>
                <TextField type="text" name="image" label="Image Url:" value={user.profile.image} placeholder="Image URL" />
                <SelectField name="classStanding" label="Grade Status:" value={user.profile.classStanding} placeholder="Choose...">
                  options= {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']}
                </SelectField>
                <SelectField label="Focus:" name="major" value={user.profile.major} placeholder="Choose...">
                  options= {['Information and Computer Sciences (ICS)', 'Information Technology Management (ITM)', 'Computer Engineering']}
                </SelectField>
                <TextField as="textarea" name="description" label="Description:" value={user.profile.description} placeholder="Tell us more about you" />
                <ErrorsField />
                <Row>
                  <Col className="d-flex justify-content-end">
                    <SubmitField value="Submit" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Editing was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

EditProfileOld.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

EditProfileOld.defaultProps = {
  location: { state: '' },
};

export default EditProfileOld;
