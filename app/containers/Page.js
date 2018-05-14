import React, { Component } from 'react'
import URL from 'url'
import styled from 'styled-components/native'
import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import CleanWebView from 'react-native-clean-webview'

import { updateItem } from '../reducers/collections'

const Web = styled.WebView`
  flex: 1;
  border-width: 3;
  border-color: blue;
`

class Page extends Component {
  onNavigationStateChange = state => {
    const {
      navigation: {
        state: {
          params: { url, collectionId },
        },
      },
    } = this.props

    const hostname = URL.parse(url).hostname

    this.props.dispatch(
      updateItem({
        collectionId,
        item: {
          url,
          domain: hostname,
          title: state.title,
        },
      }),
    )
  }

  render() {
    const css = `
      * {
        display: none;
      }
    `
    const css_old = `

      img, figure {
        width: 100%;
        margin: 0;
        padding: 0;
        display: none;
      }

      body {
        padding: 48px 0px;
        color: black;
        background-color: white;
      }

      a {
        text-decoration: none;
        color: black;
        font-weight: 500;
      }

      label, li, span, p, h1, h2, h3, h4, h5, h6 {
        padding: 0px 24px;
      }

      h1, h2, h3, h4, h5, h6 {
        padding-top: 48px;
        padding-bottom: 24px;
      }

      @keyframes background-animation {
        0% {
          background-color: white;
        }
        100% {
          background-color: black;
        }
      }

  `

    const {
      navigation: {
        state: {
          params: { url, collectionId },
        },
      },
      source,
    } = this.props

    console.log(source)

    // if (source) {
    return (
      <Web
        onNavigationStateChange={this.onNavigationStateChange}
        source={{ uri: url }}
      />
    )
    // }

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <CleanWebView
          url={url}
          htmlCss={css_old}
          onCleaned={(readabilityArticle, cleanedHtml) => {
            console.log('cleaned')
            this.props.dispatch(
              updateItem({
                collectionId,
                item: {
                  url,
                  source: cleanedHtml,
                  domain: readabilityArticle.byline,
                  title: readabilityArticle.title,
                },
              }),
            )
          }}
          onError={error => {
            console.log('error', error)
          }}
        />
      </View>
    )
  }
}

export default connect(
  (state, props) =>
    console.log(state) || {
      source: state.collections.list
        .find(c => c.name === props.navigation.state.params.collectionId)
        .items.find(e => e.url === props.navigation.state.params.url).source,
    },
)(Page)
