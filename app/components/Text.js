import styled from 'styled-components/native'

const Text = styled.Text`
  color: #424242;
`

export const Title = styled(Text)`
  font-size: 24px;
  font-family: 'Garamond-SemiBold';
`

export const Subtitle = styled(Title)`
  font-size: 18px;
`

export const Description = styled(Text)`
  font-family: 'CormorantGaramond-Semibold';
  font-size: 16px;
`

export const Label = styled(Description)`
  font-family: 'CormorantGaramond-Bold';
  font-size: 14px;
  padding-bottom: 6px;
`

export const ListDescription = styled(Description)`
  margin-top: 6px;
  width: 240px;
  font-family: 'CormorantGaramond-Semibold';
  font-size: 14px;
`
