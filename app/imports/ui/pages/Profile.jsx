import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';

const Profile = () => {
  const user = Meteor.user();

  if (!user) {
    return <div>How did you get here?... Go Back</div>;
  }

  return (
    <Container id="profile-page" className="my-auto py-3 d-flex justify-content-center">
      <Col className="col-7" id="white-box">
        <Row className="mx-auto justify-content-start">
          {/* Name */}
          <Col>
            <div className="d-flex flex-wrap">
              <h2 className="">First Name:</h2>
              <div className="my-2 d-flex">
                <input className="mx-5" type="text" placeholder="replace" disabled />
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h2 className="">Last Name:</h2>
              <div className="my-2 d-flex">
                <input className="mx-5" type="text" placeholder="replace" disabled />
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h2 className="">Email:</h2>
              <div className="my-2 d-flex">
                <input className="mx-5" type="text" placeholder={user.emails[0].address} disabled />
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h2 className="">Password:</h2>
              <div className="my-2 d-flex">
                <input className="mx-5" type="text" placeholder={user.password} disabled />
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h2 className="">Class Standing:</h2>
              <div className="my-2 d-flex">
                <input className="mx-5" type="text" placeholder={user.major} disabled />
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h2 className="">Major:</h2>
              <div className="my-2 d-flex">
                <input className="mx-5" type="text" placeholder="replace" disabled />
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h2 className="">Description:</h2>
              <div className="my-2 d-flex">
                <textarea className="mx-5 description-box" rows="3" placeholder="replace" disabled />
              </div>
            </div>
          </Col>
          <Col className="col-2">
            <div className="d-flex justify-content-end">
              <Image className="pro-pic-image" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" />
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
