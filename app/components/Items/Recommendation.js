import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/Ionicons'

const ListWrapper = styled.View`
  width: 100%;
  padding-top: 16px;
`

const Container = styled.ScrollView`
  width: 100%;
  padding: 16px;
`

const Label = styled.Text`
  color: #424242;
  font-size: 12px;
  margin-bottom: 8px;
`

const Content = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #424242;
`

const Cover = styled.Image`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  flex: 1;
`

const Add = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: #2275fa;
  margin: 8px;
  right: 0;
  top: 0;
  position: absolute;
`

const Information = styled.View`
  width: 100%;
  padding: 16px;
  background-color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

const Item = styled.View`
  position: relative;
  width: 200px;
  height: 200px;
  margin-right: 16px;
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

const Title = styled.Text`
  font-size: 14px;
  color: #828282;
  padding-left: 16px;
`

class Recommendation extends Component {
  static defaultProps = {
    items: [
      {
        uri:
          'https://images.unsplash.com/photo-1511949817959-d24d516a8f8e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7ff012e291ab08145b3f7a995cd644ef&auto=format&fit=crop&w=1650&q=80',
        name: 'Urban Jungle',
        author: 'weshguillaume',
      },
      {
        uri:
          'https://images.unsplash.com/photo-1498766707495-856f300a5821?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbd78da5b0ccb1fcf6e54a2e5e51f63&auto=format&fit=crop&w=1651&q=80',
        name: 'House Plant Club',
        author: 'planterina',
      },
      {
        uri:
          'https://images.unsplash.com/photo-1498766707495-856f300a5821?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbd78da5b0ccb1fcf6e54a2e5e51f63&auto=format&fit=crop&w=1651&q=80',
        name: 'Gardening',
        author: 'youngherborist',
      },
      {
        uri:
          'https://images.unsplash.com/photo-1498766707495-856f300a5821?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbd78da5b0ccb1fcf6e54a2e5e51f63&auto=format&fit=crop&w=1651&q=80',
        name: 'Urban Jungle',
        author: 'weshguillaume',
      },
      {
        uri:
          'https://images.unsplash.com/photo-1498766707495-856f300a5821?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbd78da5b0ccb1fcf6e54a2e5e51f63&auto=format&fit=crop&w=1651&q=80',
        name: 'House Plant Club',
        author: 'planterina',
      },
      {
        uri:
          'https://images.unsplash.com/photo-1498766707495-856f300a5821?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbd78da5b0ccb1fcf6e54a2e5e51f63&auto=format&fit=crop&w=1651&q=80',
        name: 'Gardening',
        author: 'youngherborist',
      },
    ],
  }

  render() {
    const { items = [] } = this.props

    if (items.length === 0) {
      return null
    }

    return (
      <ListWrapper>
        <Title>You might also like</Title>
        <Container
          horizontal={true}
          decelerationRate={0}
          snapToInterval={216}
          snapToAlignment={'start'}
          showsHorizontalScrollIndicator={false}
        >
          {items.map((i, index) => (
            <Item key={i.name + i.author + index.toString()}>
              <Cover
                source={{
                  uri: i.uri,
                }}
              />
              <Information>
                <Label>{i.author}</Label>
                <Content>{i.name}</Content>
              </Information>
              <Add>
                <Icon name="md-bookmark" size={15} color="white" />
              </Add>
            </Item>
          ))}
        </Container>
      </ListWrapper>
    )
  }
}

export default Recommendation
