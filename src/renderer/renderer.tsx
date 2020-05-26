import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import 'typeface-roboto';
import 'normalize.css';
import '@renderer/styles/colors.scss';

import App from '@renderer/containers/App';
import './renderer.scss';

ReactDOM.render(<App />, document.getElementById('root'));
