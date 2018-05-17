import React from 'react'
import { Text } from 'react-native'

export default function ErrorScreen({ error }) {
  return <Text>{JSON.stringify(error)}</Text>
}
