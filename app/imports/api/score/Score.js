import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ScoresCollection. It encapsulates state and variable values for Score.
 */
class ScoresCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ScoresCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      attendance: Number,
      score: Number,
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
 * The singleton instance of the ScoresCollection.
 * @type {ScoresCollection}
 */
export const Scores = new ScoresCollection();
