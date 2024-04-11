import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';

const Profile = () => {
  const user = Meteor.user();

  if (!user) {
    return <div>How did you get here?... Go Back</div>; // or redirect to login page
  }

  return (
    <Container id="profile-page" className="my-auto py-3 d-flex justify-content-center">
      <Col className="col-7" id="white-box">
        <Row className="mx-auto justify-content-start">
          {/* Name */}
          <Col>
            <div className="d-flex flex-wrap">
              <h2 className="">Name:</h2>
              <div className="my-2 d-flex">
                <input className="mx-5 flex-grow-1" type="text" placeholder={user.username} disabled />
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h2 className="">Major:</h2>
              <div className="my-2 d-flex">
                <input className="mx-5 flex-grow-1" type="text" disabled />
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h2 className="">Sensei:</h2>
              <div className="my-2 d-flex">
                <input className="mx-5 flex-grow-1" type="text" disabled />
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h2 className="">Grasshopper:</h2>
              <div className="my-2 d-flex">
                <input className="mx-5 flex-grow-1" type="text" disabled />
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h2 className="">Description:</h2>
              <div className="my-2 d-flex">
                <textarea className="mx-5 description-box" rows="3" disabled />
              </div>
            </div>
          </Col>
          <Col className="col-2">
            <div className="d-flex justify-content-end">
              <Image className="pro-pic-image" src="https://avatars.githubusercontent.com/u/156398965?v=4" />
            </div>
          </Col>
        </Row>
        <Container className="pt-3 d-flex justify-content-end w-100">
          <div>
            <Button className="button-test">Edit</Button>
          </div>
        </Container>
      </Col>
    </Container>
  );
};

export default Profile;
