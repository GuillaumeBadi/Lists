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
  constructor(props) {
    super(props)
    this.items = {}
  }

  collectionForm = () => {
    this.props.navigation.push('CollectionForm')
  }

  openCollection = id => () => {
    this.props.navigation.push('Items', { id })
  }

  collectionSettings = id => () => {
    this.props.navigation.push('CollectionSettings', { id })
    this.items[id].recenter()
  }

  settingsView = () => {
    this.props.navigation.push('Settings')
  }

  renderSettings = () => {
    return <Icon name="md-settings" onPress={this.settingsView} />
  }

  renderRight = () => {
    return <Icon name="md-add" onPress={this.collectionForm} />
  }

  removeCollection = id => () => {
    return this.props.dispatch(removeCollection(id))
  }

  render() {
    const { collections, username } = this.props

    return (
      <Container>
        <Header
          renderLeft={this.renderSettings}
          renderRight={this.renderRight}
        />
        <List showsVerticalScrollIndicator={false}>
          <Items>
            <SectionTitle>Your Collections</SectionTitle>
            {collections.map(collection => (
              <ListItem
                ref={l => (this.items[collection.id] = l)}
                onPress={this.openCollection(collection.id)}
                username={username}
                onChange={this.collectionSettings(collection.id)}
                onRemove={this.removeCollection(collection.id)}
                key={collection.id}
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
