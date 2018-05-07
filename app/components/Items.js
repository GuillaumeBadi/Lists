import React, { Component } from 'react'
import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/Ionicons'

import ListItem from './ListItem'
import Header from './Header'
import Content from './Content'
import { Title, Desription } from './Text'

const Container = styled.View`
  flex: 1;
  background-color: white;
`

const Items = styled.View`
  padding-top: 48px;
  padding-bottom: 96px;
  flex: 1;
`

const List = styled.ScrollView``

class Items extends Component {
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

  render() {
    return (
      <Container>
        <Header
          renderLeft={this.renderBack}
          renderRight={this.renderSettings}
        />
        <Content>
          <List>
            <Title>Your collections</Title>
            <Description>ok</Description>
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

export default Items
