import React, { Component } from 'react'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

import Content from './Content'
import Icon from './HeaderIcon'
import ListItem from './ListItem'
import Header from './Header'
import NoCollection from './NoCollection'
import CTA from './CTA'

import SectionTitle from './SectionTitle'
import PreviewTitle from './PreviewTitle'
import { connect } from 'react-redux'
import { removeCollection } from '../reducers/collections'
import config from '../config'

const Container = styled.View`
  flex: 1;
  background-color: white;
  position: relative;
`

const CTAContainer = styled(LinearGradient)`
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
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

  removeCollection = id => () => {
    return this.props.dispatch(removeCollection(id))
  }

  render() {
    const { collections, username } = this.props

    if (collections && !collections.length) {
      return (
        <Container>
          <Header
            renderLeft={this.renderSettings}
            renderRight={this.renderRight}
          />
          <NoCollection createCollection={this.collectionForm} />
        </Container>
      )
    }

    return (
      <Container>
        <Header
          renderLeft={this.renderSettings}
          renderRight={this.renderRight}
        />
        <List showsVerticalScrollIndicator={false}>
          <Items>
            <SectionTitle>
              Hello, {username.charAt(0).toUpperCase() + username.slice(1)} 🙂
            </SectionTitle>
            <Content>
              <PreviewTitle>Votre premiere collection</PreviewTitle>
            </Content>
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
        <CTAContainer colors={['transparent', 'white']}>
          <CTA onPress={this.collectionForm}>Create a new Collection</CTA>
        </CTAContainer>
      </Container>
    )
  }
}

export default connect()(CollectionsView)
