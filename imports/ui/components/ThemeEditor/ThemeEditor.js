/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class ThemeEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        body: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        body: {
          required: 'This needs a body, please.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingTheme = this.props.theme && this.props.theme._id;
    const methodToCall = existingTheme ? 'themes.update' : 'themes.insert';
    const theme = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingTheme) theme._id = existingTheme;

    Meteor.call(methodToCall, theme, (error, themeId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingTheme ? 'Theme updated!' : 'Theme added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/themes/${themeId}`);
      }
    });
  }

  render() {
    const { theme } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={theme && theme.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={theme && theme.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {theme && theme._id ? 'Save Changes' : 'Add Theme'}
      </Button>
    </form>);
  }
}

ThemeEditor.defaultProps = {
  theme: { title: '', body: '' },
};

ThemeEditor.propTypes = {
  theme: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default ThemeEditor;
