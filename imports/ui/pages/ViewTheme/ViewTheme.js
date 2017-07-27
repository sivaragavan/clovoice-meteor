import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Themes from '../../../api/Themes/Themes';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';

const handleRemove = (themeId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('themes.remove', themeId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Theme deleted!', 'success');
        history.push('/themes');
      }
    });
  }
};

const renderTheme = (theme, match, history) => (theme ? (
  <div className="ViewTheme">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ theme && theme.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(theme._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { theme && theme.body }
  </div>
) : <NotFound />);

const ViewTheme = ({ loading, theme, match, history }) => (
  !loading ? renderTheme(theme, match, history) : <Loading />
);

ViewTheme.propTypes = {
  loading: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const themeId = match.params._id;
  const subscription = Meteor.subscribe('themes.view', themeId);

  return {
    loading: !subscription.ready(),
    theme: Themes.findOne(themeId) || {},
  };
}, ViewTheme);
