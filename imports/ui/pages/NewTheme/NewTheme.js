import React from 'react';
import PropTypes from 'prop-types';
import ThemeEditor from '../../components/ThemeEditor/ThemeEditor';

const NewTheme = ({ history }) => (
  <div className="NewTheme">
    <h4 className="page-header">New Theme</h4>
    <ThemeEditor history={history} />
  </div>
);

NewTheme.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewTheme;
