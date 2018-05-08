import React, { Component } from 'react'
import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/Ionicons'
import ListItem from './ListItem'
import Content from './Content'
import { Title } from './Text'
import Header from './Header'

const Container = styled.View`
  flex: 1;
  background-color: white;
`

const List = styled.ScrollView``

const Items = styled.View`
  padding-top: 48px;
  padding-bottom: 96px;
  flex: 1;
`

class CollectionsView extends Component {
  state = {
    nodes: [],
  }

  collectionForm = () => {
    this.props.navigation.push('CollectionForm')
  }

  renderAdd = () => {
    return (
      <Icon
        onPress={this.collectionForm}
        name="md-add"
        size={20}
        color="#424242"
      />
    )
  }

  openCollection = id => () => {
    this.props.navigation.push('Items', { id })
  }

  render() {
    const { collections } = this.props

    return (
      <Container>
        <Header renderRight={this.renderAdd} />
        <Content>
          <List>
            <Title>Your collections</Title>
            <Items>
              {collections.map((collection, i) => (
                <ListItem
                  key={i}
                  onPress={this.openCollection(collection.id)}
                  title={collection.name}
                  description={collection.description}
                />
              ))}
            </Items>
          </List>
        </Content>
      </Container>
    )
  }
}

export default CollectionsView
