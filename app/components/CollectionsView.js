import React, { Component } from 'react'
import styled from 'styled-components/native'

import Icon from './HeaderIcon'
import ListItem from './ListItem'
import Header from './Header'

import SectionTitle from './SectionTitle'
import { connect } from 'react-redux'
import { removeCollection } from '../reducers/collections'
import config from '../config'

const Container = styled.View`
  flex: 1;
  background-color: white;
`

const List = styled.ScrollView``

const Items = styled.View`
  padding-top: 24px;
  height: 100%;
  flex: 1;
`

class CollectionsView extends Component {
  state = {
    scrolling: false,
    scrollTop: true,
    nodes: [],
  }

  collectionForm = () => {
    this.props.navigation.push('CollectionForm')
  }

  openCollection = id => () => {
    this.props.navigation.push('Items', { id })
  }

  handleScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    this.setState({ scrollTop: y < 5 })
  }

  renderAdd = () => {
    return (
      <Icon
        name="md-add"
        onPress={this.collectionForm}
        color={config.header.iconColor}
        size={20}
      />
    )
  }

  removeCollection = id => () => {
    return this.props.dispatch(removeCollection(id))
  }

  scrollStart = () => this.setState({ scrolling: true })
  scrollStop = () => this.setState({ scrolling: false })

  render() {
    const { collections, username } = this.props

    return (
      <Container>
        <Header renderRight={this.renderAdd} />
        <List
          onScrollBeginDrag={this.scrollStart}
          onScrollEndDrag={this.scrollStop}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={10}
          onScroll={this.handleScroll}
        >
          <Items>
            <SectionTitle>Your Collections</SectionTitle>
            {collections.map((collection, i) => (
              <ListItem
                onPress={this.openCollection(collection.name)}
                username={username}
                onRemove={this.removeCollection(collection.name)}
                key={i}
                scrolling={this.state.scrolling}
                title={collection.name}
                description={collection.description}
              />
            ))}
          </Items>
        </List>
      </Container>
    )
  }
}

export default connect()(CollectionsView)
