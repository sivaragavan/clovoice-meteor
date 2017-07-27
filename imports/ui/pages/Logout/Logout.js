import React from 'react';
import Icon from '../../components/Icon/Icon';

import './Logout.scss';

const Logout = () => (
  <div className="Logout">
    <img
      src="/logo-500-white.png"
      alt="Clovoice"
    />
    <h1>Stay safe out there.</h1>
    <p>{'Don\'t forget to like and follow Clovoice elsewhere on the web:'}</p>
    <ul className="FollowUsElsewhere">
      <li><a href="https://facebook.com/clovoice"><Icon icon="facebook-official" /></a></li>
      <li><a href="https://twitter.com/clovoice"><Icon icon="twitter" /></a></li>
      <li><a href="https://github.com/clovoice"><Icon icon="github" /></a></li>
    </ul>
  </div>
);

Logout.propTypes = {};

export default Logout;
