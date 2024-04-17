import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';

const Profile = () => {
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
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="text-center">
            <h2>My Profile</h2>
          </div>
          <AutoForm schema={bridge}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField type="email" name="email" label="E-Mail:" value={user.emails[0].address} placeholder="E-mail address" disabled />
                    <TextField type="password" name="password" label="Password:" value="**********" placeholder="Password" disabled />
                  </Col>
                  <Col xs={4} className="d-flex justify-content-center">
                    <Image className="pro-pic-image" src={user.profile.image} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField type="text" name="firstname" label="First Name:" value={user.profile.firstname} placeholder="First Name" disabled />
                  </Col>
                  <Col>
                    <TextField type="text" name="lastname" label="Last Name:" value={user.profile.lastname} placeholder="Last Name" disabled />
                  </Col>
                </Row>
                <TextField type="text" name="image" label="Image Url:" value={user.profile.image} placeholder="Image URL" disabled />
                <SelectField name="classStanding" label="Grade Status:" value={user.profile.classStanding} placeholder="Choose..." disabled>
                  options= {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']}
                </SelectField>
                <SelectField label="Focus:" name="major" value={user.profile.major} placeholder="Choose..." disabled>
                  options= {['Information and Computer Sciences (ICS)', 'Information Technology Management (ITM)', 'Computer Engineering']}
                </SelectField>
                <TextField as="textarea" name="description" label="Description:" value={user.profile.description} placeholder="Tell us more about you" disabled />
                <ErrorsField />
                <Link to="/editprofile">
                  <SubmitField value="Edit" />
                </Link>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

Profile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

Profile.defaultProps = {
  location: { state: '' },
};

export default Profile;
