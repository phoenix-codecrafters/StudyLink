import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class SessionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SessionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      day: Number,
      month: Number,
      year: Number,
      startTime: Number,
      endTime: Number,
      class: String,
      description: String,
      ghAttend: {
        type: Array,
      },
      'ghAttend.$': {
        type: String,
      },
      ssAttend: {
        type: Array,
      },
      'ssAttend.$': {
        type: String,
      },
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {SessionsCollection}
 */
export const Sessions = new SessionsCollection();
