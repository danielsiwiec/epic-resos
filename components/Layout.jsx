import React from 'react'
import ReactGA from 'react-ga'

export default class Layout extends React.Component {

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize('G-ZCNDLHKF80')
      window.GA_INITIALIZED = true
    }
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}