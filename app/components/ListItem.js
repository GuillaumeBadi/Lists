import React, { Component } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { TouchableOpacity, Text } from 'react-native'
import Swipeable from 'react-native-swipeable'
import Content from './Content'

import { Button } from './ListActions'
import { ListDescription, Subtitle, Label } from './Text'

const Container = styled.View`
  background-color: white;
`

const LightLabel = styled(Label)`
  color: #d0d0d0;
  padding: 0;
`

const Divider = styled.View`
  border-bottom-width: 1;
  border-bottom-color: #d0d0d0;
  margin-top: -8px;
  margin-bottom: 4px;
  width: 100px;
`

const TagText = styled.Text`
  color: white;
  text-align: center;
  font-size: 10px;
`

const TagContainer = styled.TouchableOpacity`
  padding: 3px 6px;
  background-color: ${props => props.color};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`

const TagsContainer = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
`

function Tag({ color, children }) {
  return (
    <TagContainer color={color}>
      <TagText>{children}</TagText>
    </TagContainer>
  )
}

class ListItem extends Component {
  recenter() {
    this.s.recenter()
  }

  componentDidUpdate(props) {
    if (props.scrolling !== this.props.scrolling && this.props.scrolling) {
      this.recenter()
    }
  }

  render() {
    const { username, title, description, onPress, onRemove } = this.props

    const rightButtons = [<Button key={0} icon="md-trash" onPress={onRemove} />]

    return (
      <View
        style={{
          backgroundColor: '#FF9F02',
          width: '100%',
        }}
      >
        <Swipeable ref={r => (this.s = r)} rightButtons={rightButtons}>
          <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <Container>
              <Content>
                <LightLabel>{username}</LightLabel>
                <Divider />
                <Subtitle>{title}</Subtitle>
                {description && (
                  <ListDescription>{description}</ListDescription>
                )}
              </Content>
            </Container>
          </TouchableOpacity>
        </Swipeable>
      </View>
    )
  }
}

export default ListItem
