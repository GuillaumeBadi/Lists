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
  width: 260px;
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
