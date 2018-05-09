import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/Ionicons'

import RemoveCollection from '../containers/RemoveCollection'

import ListItem from './ListItem'
import Header from './Header'
import Content from './Content'
import { Title, Description } from './Text'

import { getCollectionItems } from '../queries'

const Container = styled.View`
  flex: 1;
  background-color: white;
`

const ListContent = styled.View`
  padding-top: 48px;
  padding-bottom: 96px;
  flex: 1;
`

const List = styled.ScrollView``

class ItemsView extends Component {
  renderSettings = () => {
    return <Icon name="md-add" size={20} color="#424242" />
  }

  renderBack = () => {
    return (
      <Icon
        onPress={() => this.props.navigation.pop()}
        name="md-arrow-back"
        size={20}
        color="#424242"
      />
    )
  }

  itemForm = () => {
    this.props.navigation.push('ItemForm', { id: this.props.collectionId })
  }

  renderAdd = () => {
    return (
      <Icon onPress={this.itemForm} name="md-add" size={20} color="#424242" />
    )
  }

  removeCollection = () => {
    this.props.navigation.pop()
  }

  render() {
    const { items, name, description } = this.props

    return (
      <Container>
        <Header renderLeft={this.renderBack} renderRight={this.renderAdd} />
        <Content>
          <List>
            <Title>{name}</Title>
            <RemoveCollection
              onPress={this.removeCollection}
              id={this.props.collectionId}
            />
            {description && <Description>{description}</Description>}
            <ListContent>
              {items.map((item, i) => (
                <ListItem key={i} title={item.value.url} />
              ))}
            </ListContent>
          </List>
        </Content>
      </Container>
    )
  }
}

export default ItemsView
