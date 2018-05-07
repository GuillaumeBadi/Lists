import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View``

export default function CreateCollection({ onPress }) {
  return <Button title="Add" onPress={onPress} />
}
