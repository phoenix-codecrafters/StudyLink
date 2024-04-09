import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Users = new Mongo.Collection('Users');

const UserSchema = new SimpleSchema({
  firstName: {
    type: String,
    optional: false,
  },
  lastName: {
    type: String,
    optional: false,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: false,
  },
  password: {
    type: String,
    optional: false,
  },
  classStanding: {
    type: String,
    allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'],
    defaultValue: 'Freshman',
  },
  image: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
  major: {
    type: String,
    allowedValues: [
      'Information and Computer Sciences (ICS)',
      'Information Technology Management (ITM)',
      // Add other majors as needed
    ],
    defaultValue: 'Information and Computer Sciences (ICS)',
  },
  subject: {
    type: String,
    optional: true,
  },
  coursename: {
    type: String,
    optional: false,
    custom() {
      const validCourseNames = [
        'ICS 101',
        'Digital Tools for the Information World',
        'ICS 101 Digital Tools for the Information World',
        // Add other course names and codes...
      ];
      if (!validCourseNames.includes(this.value)) {
        return 'invalidCoursename';
      }
      return undefined;
    },
  },
  description: {
    type: String,
    optional: true,
  },
  tutor: {
    type: Boolean,
    defaultValue: true,
  },
}, { tracker: Tracker });

Users.attachSchema(UserSchema);

export { Users, UserSchema };
