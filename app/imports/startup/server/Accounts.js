import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

const createUser = (email, password, firstname, lastname, coursename, classStanding, image, major, subject, tutor, description, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: { // Storing additional user information within the profile object
      firstname: firstname,
      lastname: lastname,
      classStanding: classStanding,
      image: image,
      major: major,
      description: description,
    },
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

// Initialization of default users from settings
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    // eslint-disable-next-line max-len
    Meteor.settings.defaultAccounts.forEach(({ email, password, firstname, lastname, classStanding, image, major, description, role }) => createUser(email, password, firstname, lastname, classStanding, image, major, description, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
