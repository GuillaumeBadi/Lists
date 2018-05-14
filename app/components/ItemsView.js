import React, { Component } from 'react'
import styled from 'styled-components/native'

import Icon from './HeaderIcon'

import ListItem from './ListItem'
import Header from './Header'
import Content from './Content'
import { Title, Description } from './Text'

const PaddedContent = styled(Content)`padding-top: 48px;`

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

  openItem = url => () => {
    this.props.navigation.push('Page', {
      url,
      collectionId: this.props.collectionId,
    })
  }

  itemForm = () => {
    this.props.navigation.push('ItemForm', { id: this.props.collectionId })
  }

  renderAdd = () => {
    return <Icon onPress={this.itemForm} name="md-add" size={20} color="#fff" />
  }

  removeItem = url => () => {
    this.props.removeItem(url)
  }

  removeCollection = () => {
    this.props.navigation.pop()
  }

  render() {
    const { items = [], name, description } = this.props

    return (
      <Container>
        <Header renderLeft={this.renderBack} renderRight={this.renderAdd} />
        <List>
          <PaddedContent>
            <TitleContainer>
              <Title>{name}</Title>
            </TitleContainer>
            {description && <Description>{description}</Description>}
          </PaddedContent>
          <ListContent>
            {items.map((item, i) => (
              <ListItem
                onPress={this.openItem(item.url)}
                onRemove={this.removeItem(item.url)}
                key={i}
                username={item.domain}
                title={item.title || item.url}
              />
            ))}
          </ListContent>
        </List>
      </Container>
    )
  }
}

export default ItemsView
