import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Themes from '../../../api/Themes/Themes';
import ThemeEditor from '../../components/ThemeEditor/ThemeEditor';
import NotFound from '../NotFound/NotFound';

const EditTheme = ({ theme, history }) => (theme ? (
  <div className="EditTheme">
    <h4 className="page-header">{`Editing "${theme.title}"`}</h4>
    <ThemeEditor theme={theme} history={history} />
  </div>
) : <NotFound />);

EditTheme.propTypes = {
  theme: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const themeId = match.params._id;
  const subscription = Meteor.subscribe('themes.view', themeId);

  return {
    loading: !subscription.ready(),
    theme: Themes.findOne(themeId),
  };
}, EditTheme);
