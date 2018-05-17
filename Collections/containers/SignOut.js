import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class SignOut extends Component {
  signout = async () => {
    await AsyncStorage.removeItem('token')
    this.props.navigation.navigate('Login')
  }

  render() {
    const { id } = this.props

    return (
      <Icon name="md-person" color="white" size={20} onPress={this.signout} />
    )
  }
}

export default SignOut
