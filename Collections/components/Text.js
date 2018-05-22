import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const Text = styled.Text`
  color: black;
`

export const Title = styled(Text)`
  font-size: 24px;
  font-family: EBGaramond-SemiBold;
`

export const Subtitle = styled(Title)`
  font-size: 18px;
  font-family: EBGaramond-SemiBold;
`

export const Description = styled(Text)`
  font-family: EBGaramond-Regular;
  font-size: 15px;
  width: 280px;
  margin: 12px 0;
`

export const Label = styled(Description)`
  font-family: EBGaramond-Medium;
  font-size: 14px;
  padding-bottom: 6px;
`

export const ListDescription = styled(Description)`
  margin-top: 6px;
  font-size: 14px;
`

export function Tag({ children, onPress }) {
  const TagContainer = styled.TouchableOpacity`
    height: 20px;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;
    border-radius: 3px;
    background-color: black;
    margin-right: 4px;
    margin-top: 4px;
  `

  const TagText = styled.Text`
    color: white;
    font-size: 11px;
  `

  // TODO: activeOpacity: 1 causes the item to stay the same because
  //    search by tag is not implemented yet
  return (
    <TagContainer activeOpacity={1} onPress={onPress}>
      <TagText>{children}</TagText>
    </TagContainer>
  )
}
