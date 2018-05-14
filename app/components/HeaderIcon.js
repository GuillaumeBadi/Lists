
import React from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import config from '../config'

const I = styled(Ionicons)`
  padding: ${config.header.padding};
`

export default function Icon({ ...props }) {
  return (
    <I {...props} color={config.header.iconColor} size={20} />
  )
}
