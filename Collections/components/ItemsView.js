import React, { Component } from 'react'
import styled from 'styled-components/native'

import Icon from './HeaderIcon'

import ListItem from './ListItem'
import Header from './Header'
import Content from './Content'
import { Title, Description } from './Text'
import removeItem from '../containers/RemoveItem'

const PaddedContent = styled(Content)`
  padding-top: 48px;
`

const RightHeader = styled.View`
  align-items: center;
  flex-flow: row;
`

const Container = styled.View`
  flex: 1;
  background-color: white;
`

const ListContent = styled.View`
  padding-bottom: 96px;
  flex: 1;
`

const TitleContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-flow: row;
`

const List = styled.ScrollView``

class ItemsView extends Component {
  renderSettings = () => {
    return <Icon name="md-add" size={20} color="#fff" />
  }

  renderBack = () => {
    return (
      <Icon
        onPress={() => this.props.navigation.pop()}
        name="md-arrow-back"
        size={20}
        color="#fff"
      />
    )
  }

  openItem = id => () => {
    this.props.navigation.push('Page', { id })
  }

  itemForm = () => {
    this.props.navigation.push('ItemForm', { id: this.props.collectionId })
  }

  collectionSettings = () => {
    this.props.navigation.push('CollectionSettings', {
      id: this.props.collectionId,
    })
  }
  renderRight = () => (
    <RightHeader>
      <Icon name="md-settings" onPress={this.collectionSettings} />
      <Icon name="md-add" onPress={this.itemForm} />
    </RightHeader>
  )

  removeItem = id => () => {
    this.props.removeItem(id)
  }

  removeCollection = () => {
    this.props.navigation.pop()
  }

  render() {
    const { items = [], name, description } = this.props

    return (
      <Container>
        <Header renderLeft={this.renderBack} renderRight={this.renderRight} />
        <List>
          <PaddedContent>
            <TitleContainer>
              <Title>{name}</Title>
            </TitleContainer>
            {description && <Description>{description}</Description>}
          </PaddedContent>
          <ListContent>
            {items.map(item => (
              <ListItem
                id={item.id}
                onPress={this.openItem(item.id)}
                removeComponent={removeItem(this.props.collectionId)}
                key={item.id}
                username={item.value.type}
                title={item.value.url.slice(0, 20)}
              />
            ))}
          </ListContent>
        </List>
      </Container>
    )
  }
}

export default ItemsView
