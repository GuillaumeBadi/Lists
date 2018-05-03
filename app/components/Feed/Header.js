import React from 'react'
import { View, Text, Image } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

const HEADER_SIZE = 100
const NAVIGATION_SIZE = 64

const Navigation = styled.View`
  background-color: #2275fa;
  height: ${NAVIGATION_SIZE};
  align-items: center;
  width: 100%;
  flex-direction: row;
  top: 0;
`

const Container = styled.View`width: 100%;`

const Username = styled.TextInput`
  width: 80%;
  padding: 8px 16px;
  background-color: #206be5;
  border-radius: 10px;
  color: white;
`

const I = styled(Icon)`padding: 16px;`

export default function(props) {
  return (
    <Container>
      <Navigation>
        <I name="md-arrow-back" color="white" size={20} />
        <Username
          underlineColorAndroid="transparent"
          selectionColor="#4CF78E"
          selectTextOnFocus
          value="Daily House Plants"
        />
      </Navigation>
    </Container>
  )
}
