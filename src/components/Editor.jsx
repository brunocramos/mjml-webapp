import React from 'react';
import AceEditor from 'react-ace'
import 'brace/mode/xml'
import 'brace/theme/clouds_midnight'

export default (props) => (
  <div className='c-editor'>
    <AceEditor
      mode='xml'
      fontSize={14}
      wrapEnabled={true}
      height='100%'
      width='100%'
      tabSize={2}
      theme='clouds_midnight'
      value={props.content}
      onChange={content => props.handleChange(content)}
      name='editor'
    />
  </div>
)
