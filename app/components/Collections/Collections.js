import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

import CreateCollection from '../CreateCollection'
import ListItem from '../ListItem'

import { getUserCollections } from '../../queries'

import Hero from '../Hero'

const Container = styled.View`
  background-color: #fff;
  flex: 1;
  justify-content: center;
`

const ButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`

const List = styled.ScrollView`
  width: 100%;
  flex: 1;
  background-color: #fff;
`

const ItemContainer = styled.View`
  width: 90%;
  padding: 8px 16px;
  margin: 8px;
  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: #424242;
`

class Collections extends Component {
  static navigationOptions = {
    title: 'Your Collections',
  }

  openList = () => null

  createCollection = () => {
    this.props.navigation.navigate('CollectionForm')
  }

  render() {
    const { data } = this.props

    if (data && data.loading) {
      return <Text>Loading</Text>
    }

    const {
      viewer: {
        collections: { nodes },
      },
    } = data

    return (
      <Container>
        <List>
          <Hero title="Hello Guillaume" />
          {nodes.map(({ name, user: { username } }) => (
            <ListItem key={name} author={username} title={name} />
          ))}
          <ListItem author="Guillaume" title="House Plant Club" />
          <ListItem author="Guillaume" title="House Plant Club" />
          <ListItem author="Guillaume" title="House Plant Club" />
          <ListItem author="Guillaume" title="House Plant Club" />
          <ListItem author="Guillaume" title="House Plant Club" />
          <CreateCollection onPress={this.createCollection} />
        </List>
      </Container>
    )
  }
}

export default graphql(getUserCollections)(Collections)
