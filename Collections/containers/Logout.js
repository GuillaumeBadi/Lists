
import React from 'react'
import { AsyncStorage } from 'react-ntive'

class Logout extends Component {

  async logout = () => {
    AsyncStorage.removeItem('token')
    this.props.navigation.navigate('Auth')
  }

  render() {
    const { children } = this.props
    return children(this.logout)
  }
}

export default Logout
