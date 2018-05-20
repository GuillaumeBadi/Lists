import React, { Component } from 'react'
import { Text } from 'react-native'
import Share from 'react-native-share-extension'

const result = Share.data()

export default class CollectionShare extends Component {
  render() {
    return <Text>{result}</Text>
  }
}
