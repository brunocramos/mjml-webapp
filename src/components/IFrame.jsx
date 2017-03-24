/**
 * @author https://github.com/mjmlio/mjml-app
 */

import React, { Component } from 'react'

class Iframe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    }
  }

  componentDidMount () {
    this.renderIframe();
    this.loadImages();

    /*
     this._iframe.contentWindow.addEventListener('scroll', () => {
     if (this.props.onScroll) {
     this.props.onScroll(this._iframe.contentWindow.pageYOffset)
     }
     })
     */
  }

  componentDidUpdate (prev) {
    this.renderIframe()

    const body = this._iframe.contentWindow.document.body
    const { scrollHeight, clientHeight } = body

    if (prev.scroll !== this.props.scroll) {
      const scroll = (scrollHeight - clientHeight) * (this.props.scroll / 100)

      this._iframe.contentWindow.document.body.scrollTop = scroll
    }
  }

  // Load all images in the iframe and set the state to { loading: false }
  loadImages () {

    const doc = this._iframe.contentDocument
    const documentElement = doc.documentElement
    const images = documentElement.querySelectorAll('img')

    Promise.all(Array.from(images).map(i => new Promise(resolve => {
      const img = new Image()
      img.onload = resolve
      img.onerror = resolve
      img.src = i.src
    }))).then(() => {
      this.setState({ loading: false })
    })
  }

  renderIframe () {
    const { template } = this.props
    if (!template) { return }
    const html = template
    if (html === this._oldHtml) { return }
    const doc = this._iframe.contentDocument
    const documentElement = doc.documentElement
    documentElement.innerHTML = html
    this._oldHtml = html
  }

  render () {
    const { loading } = this.state

    return (
      <div className='Iframe-container'>
        {loading && (
          <div className='Iframe-loader'>
            <i className='ion-aperture rotating' />
          </div>
        )}
        <iframe
          className='Iframe-iframe'
          ref={el => { this._iframe = el }}/>
      </div>
    )
  }

}

export default Iframe
