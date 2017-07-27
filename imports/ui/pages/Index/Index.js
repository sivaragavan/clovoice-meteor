import React from 'react';
import { Button } from 'react-bootstrap';

import './Index.scss';

const Index = () => (
  <div className="Index">
    <img
      src="/logo-500-white.png"
      alt="Clovoice"
    />
    <h1>Clovoice</h1>
    <p>Plug-n-Play Voice Stack for your application</p>
    <div>
      {/* <Button href="">Read the Docs</Button>
      <Button href=""><i className="fa fa-star" /> Star on GitHub</Button> */}
    </div>
    <footer>
      <p>APIs for Developers to capture, process & deliver voice content/features within their applications. <a href="">Read more</a>.
      </p>
    </footer>
  </div>
);

export default Index;
