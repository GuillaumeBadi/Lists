import React, { Component } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

import { ListDescription, Subtitle } from './Text'

const Container = styled.View`
  margin-top: 12px;
  margin-bottom: 12px;
`

class ListItem extends Component {
  render() {
    const { title, description, onPress } = this.props

    return (
      <TouchableOpacity onPress={onPress}>
        <Container>
          <Subtitle>{title}</Subtitle>
          <ListDescription>{description}</ListDescription>
        </Container>
      </TouchableOpacity>
    )
  }
}

export default ListItem
