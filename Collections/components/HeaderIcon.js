import React from 'react'
import styled from 'styled-components/native'
import I from 'react-native-vector-icons/Ionicons'
import config from '../config'

const Ic = styled(I)`
  padding: ${config.header.padding};
`

export default function Icon({ ...props }) {
  return <Ic {...props} color={config.header.iconColor} size={20} />
}
