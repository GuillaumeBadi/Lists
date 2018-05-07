import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import styled from 'styled-components/native'
import { withApollo } from 'react-apollo'
import { Text, ScrollView, AsyncStorage } from 'react-native'

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
  state = {
    nodes: [],
  }

  async componentWillMount() {
    const { data } = await this.props.client.query({
      query: getUserCollections,
    })

    console.log(data)

    if (data.viewer && data.viewer.collections) {
      return this.setState({ nodes: data.viewer.collections.nodes })
    }

    await AsyncStorage.removeItem('token')
    return this.props.navigation.navigate('Login')
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

  openCollection = () => {
    this.props.navigation.push('Items')
  }

  render() {
    const { nodes } = this.state

    return (
      <Container>
        <Header renderRight={this.renderAdd} />
        <Content>
          <List>
            <Title>Your collections</Title>
            <Items>
              {nodes.map((collection, i) => (
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

export default withApollo(Collections)
