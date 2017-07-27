import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ThemesCollection from '../../../api/Themes/Themes';
import Loading from '../../components/Loading/Loading';

import './Themes.scss';

const handleRemove = (themeId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('themes.remove', themeId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Theme deleted!', 'success');
      }
    });
  }
};

const Themes = ({ loading, themes, match, history }) => (!loading ? (
  <div className="Themes">
    <div className="page-header clearfix">
      <h4 className="pull-left">Themes</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Theme</Link>
    </div>
    {themes.length ? <Table responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Last Updated</th>
          <th>Created</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {themes.map(({ _id, title, createdAt, updatedAt }) => (
          <tr key={_id}>
            <td>{title}</td>
            <td>{timeago(updatedAt)}</td>
            <td>{monthDayYearAtTime(createdAt)}</td>
            <td>
              <Button
                bsStyle="primary"
                onClick={() => history.push(`${match.url}/${_id}`)}
                block
              >View</Button>
            </td>
            <td>
              <Button
                bsStyle="danger"
                onClick={() => handleRemove(_id)}
                block
              >Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table> : <Alert bsStyle="warning">No themes yet!</Alert>}
  </div>
) : <Loading />);

Themes.propTypes = {
  loading: PropTypes.bool.isRequired,
  themes: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('themes');
  return {
    loading: !subscription.ready(),
    themes: ThemesCollection.find().fetch(),
  };
}, Themes);
