import React from 'react'
import styled from 'styled-components/native'
import Content from './Content'
import { Title } from './Text'

const PaddedContent = styled(Content)`
  padding-top: 24px;
  padding-bottom: ${props => (props.paddedBottom ? '24px' : '12px')};
`

export default function SectionTitle({ paddedBottom = true, children }) {
  return (
    <PaddedContent paddedBottom={paddedBottom}>
      <Title>{children}</Title>
    </PaddedContent>
  )
}
