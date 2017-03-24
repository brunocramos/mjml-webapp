import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default (props) => (
  <div className="c-header">
    <button
      className="c-btn c-btn-primary c-btn-beautify"
      onClick={() => props.beautifyContent()}
    >Beautify</button>

    <CopyToClipboard text={props.copyContent}>
      <button
        className="c-btn c-btn-primary"
      >Copy HTML</button>
    </CopyToClipboard>
  </div>
)
