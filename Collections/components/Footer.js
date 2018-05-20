import React, { Component } from 'react'
import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/Ionicons'

const Container = styled.View`
  width: 100%;
  background-color: white;
  border-top-width: 1;
  border-top-color: #f0f0f0;
  justify-content: space-around;
  flex-flow: row;
`

const I = styled(Icon)`padding: 16px;`

class Footer extends Component {
  render() {
    const { index, onSelect } = this.props

    return (
      <Container>
        <I
          name="md-person"
          size={25}
          color={index === 0 ? 'black' : '#b5b5b5'}
          onPress={() => onSelect(0)}
        />
        <I
          name="md-search"
          size={25}
          color={index === 1 ? 'black' : '#b5b5b5'}
          onPress={() => onSelect(1)}
        />
        <I
          name="md-paper"
          size={25}
          color={index === 2 ? 'black' : '#b5b5b5'}
          onPress={() => onSelect(2)}
        />
        <I
          name="md-bookmark"
          size={25}
          color={index === 3 ? 'black' : '#b5b5b5'}
          onPress={() => onSelect(3)}
        />
      </Container>
    )
  }
}

export default Footer
