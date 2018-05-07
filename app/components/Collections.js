import React, { Component } from 'react'
import styled from 'styled-components/native'
import { graphql } from 'react-apollo'
import { Text, ScrollView } from 'react-native'

import { getUserCollections } from '../queries'

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

class Collections extends Component {
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

  openCollection = () => {
    this.props.navigation.push('Items')
  }

  error = () => {
    const { error } = this.props
    return this.props.signOut()
  }

  render() {
    const { loading, data } = this.props

    if (data.error) {
      console.log('error', data.error)
      return null
    }

    if (loading) {
      console.log('loading')
      return null
    }

    if (!data.viewer) {
      console.log('no viewer')
      return null
    }

    return (
      <Container>
        <Header renderRight={this.renderAdd} />
        <Content>
          <List>
            <Title>Your collections</Title>
            <Items>
              {data.viewer.collections.nodes.map((collection, i) => (
                <ListItem
                  key={i}
                  onPress={this.openCollection}
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

export default graphql(getUserCollections)(Collections)
