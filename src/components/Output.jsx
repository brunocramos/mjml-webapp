import React from 'react';
import IFrame from './IFrame.jsx';

export default (props) => (
  <div className='c-output'>
    <IFrame template={props.content} />
  </div>
)
