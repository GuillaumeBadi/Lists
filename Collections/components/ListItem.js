import React, { Component } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-swipeable'
import Content from './Content'

import { Button } from './ListActions'
import { Tag, ListDescription, Subtitle, Label } from './Text'

const Container = styled.View`
  background-color: white;
`

const Wrapper = styled.View`
  margin: 12px 0;
  width: 100%;
`

export const LightLabel = styled(Label)`
  color: #d0d0d0;
  padding: 0;
`

export const Divider = styled.View`
  border-bottom-width: 2;
  border-bottom-color: #d0d0d0;
  margin-top: -8px;
  margin-bottom: 6px;
  width: 10%;
`

const Tags = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.recenter = this.recenter.bind(this)
  }

  recenter() {
    return this.s.recenter()
  }
  render() {
    const {
      username,
      title,
      description,
      onPress,
      onRemove,
      onChange,
    } = this.props

    const rightButtons = [
      <Button key={0} icon="md-settings" onPress={onChange} />,
      <Button key={1} icon="md-trash" onPress={onRemove} />,
    ]

    return (
      <Wrapper>
        <Swipeable
          ref={s => (this.s = s)}
          rightButtonWidth={75}
          rightButtons={rightButtons}
        >
          <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <Container>
              <Content>
                <LightLabel>Collection de {username}</LightLabel>
                <Divider />
                <Subtitle>{title}</Subtitle>
                <ListDescription>{description || ''}</ListDescription>
                <Tags>
                  <Tag>hello</Tag>
                  <Tag>again</Tag>
                  <Tag>world</Tag>
                </Tags>
              </Content>
            </Container>
          </TouchableOpacity>
        </Swipeable>
      </Wrapper>
    )
  }
}

export default ListItem
