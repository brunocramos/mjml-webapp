import React from 'react';
import { mjml2html } from 'mjml';
import vkbeautify from 'vkbeautify';

import loadContentIncludes from '../lib/web-mj-include';
import Header from '../components/Header.jsx';
import Editor from '../components/Editor.jsx';
import Output from '../components/Output.jsx';

const defaultTemplate =
  "<mjml>\n" +
  "	<mj-body>\n" +
  "		<mj-container>\n" +
  "			<mj-include path=\"templates/header.mjml\" />\n" +
  "			<mj-section>\n" +
  "				<mj-text>Lorem ipsum dolor sit amet</mj-text>\n" +
  "			</mj-section>\n" +

  "			<mj-include path=\"templates/footer.mjml\" />\n" +
  "		</mj-container>\n" +
  "	</mj-body>\n" +
  "</mjml>";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: defaultTemplate,
      parsedContent: '',
    };
  }

  componentWillMount() {
    this.processTemplate();
  }

  /**
   * Transform into MJML output
   */
  parseToMJML(content) {
    const res = mjml2html(content);
    if (res) {
      return res.html;
    } else {
      console.error(res);
    }
  }

  /**
   * Process current template
   */
  processTemplate() {
    const { content } = this.state;

    loadContentIncludes(content).then(newContent => {
      if (newContent) {
        const parsedContent = this.parseToMJML(newContent);
        this.setState({ parsedContent });
      }
    });
  }

  /**
   * Handle Editor Change
   * @param content
   */
  handleChange(content) {
    this.setState({ content });

    this.processTemplate();
  }

  /**
   * Beautify current xml
   */
  beautifyContent() {
    const content = vkbeautify.xml(this.state.content, 2);
    this.setState({ content });
  };


  /**
   * Render Editor and Output
   * @returns {XML}
   */
  render() {
    return (
      <div className='main'>
        <Header
          copyContent={this.state.parsedContent}
          beautifyContent={() => this.beautifyContent()}
        />
        <Editor
          content={this.state.content}
          handleChange={c => this.handleChange(c)}
        />
        <Output
          content={this.state.parsedContent}
        />
      </div>
    )
  }
}
