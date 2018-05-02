import React from 'react'
import { Button } from 'react-native'
import styled from 'styled-components/native'

const socials = {
  facebook: '#4770C6',
}

export default function SocialButton({ name, url }) {
  return <Button color={socials[name]} title={`Connect with ${name}`} />
}
