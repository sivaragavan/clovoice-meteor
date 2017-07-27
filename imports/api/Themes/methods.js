import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Themes from './Themes';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'themes.insert': function themesInsert(theme) {
    check(theme, {
      title: String,
      body: String,
    });

    try {
      return Themes.insert({ owner: this.userId, ...theme });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'themes.update': function themesUpdate(theme) {
    check(theme, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const themeId = theme._id;
      Themes.update(themeId, { $set: theme });
      return themeId; // Return _id so we can redirect to theme after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'themes.remove': function themesRemove(themeId) {
    check(themeId, String);

    try {
      return Themes.remove(themeId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'themes.insert',
    'themes.update',
    'themes.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
