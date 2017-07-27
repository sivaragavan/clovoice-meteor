/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Themes = new Mongo.Collection('Themes');

Themes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Themes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Themes.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this theme belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this theme was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this theme was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the theme.',
  },
  body: {
    type: String,
    label: 'The body of the theme.',
  },
});

Themes.attachSchema(Themes.schema);

export default Themes;
