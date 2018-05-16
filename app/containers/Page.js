import React, { Component } from 'react'
import URL from 'url'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import { updateItem } from '../reducers/collections'
import { getSource } from '../reducers/pages'

const Web = styled.WebView`
  flex: 1;
  border-width: 3;
  border-color: blue;
`

class Page extends Component {
  onNavigationStateChange = state => {
    const { item } = this.props
    if (!item) {
      return null
    }
    const hostname = URL.parse(item.url).hostname

    this.props.dispatch(
      updateItem({
        ...item,
        domain: hostname,
        title: state.title,
      }),
    )
  }

  componentDidMount() {
    const { item, source } = this.props
    if (!source) {
      this.props.dispatch(getSource(item.url, item.id))
    }
  }

  render() {
    const { source } = this.props

    if (!source) {
      return null
    }

    return (
      <Web
        onNavigationStateChange={this.onNavigationStateChange}
        source={{ html: source.source }}
      />
    )
  }
}

export default connect((state, props) => {
  const item = state.collections.items.find(
    i => i.id === props.navigation.state.params.id,
  )
  const source = state.pages.sources.find(s => s.itemId === item.id)
  return { item, source }
})(Page)
