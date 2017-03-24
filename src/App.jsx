import React from 'react';
import ReactDOM from 'react-dom';

import Main from './containers/Main.jsx';
import './styles/init.scss';

const App = () => (
  <Main />
);

ReactDOM.render(<App />, document.getElementById('app'));
