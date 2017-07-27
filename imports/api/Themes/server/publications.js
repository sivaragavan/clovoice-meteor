import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Themes from '../Themes';

Meteor.publish('themes', function themes() {
  return Themes.find({ owner: this.userId });
});

// Note: themes.view is also used when editing an existing theme.
Meteor.publish('themes.view', function ThemesView(themeId) {
  check(themeId, String);
  return Themes.find({ _id: themeId, owner: this.userId });
});
