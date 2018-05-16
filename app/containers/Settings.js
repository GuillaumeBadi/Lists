import React, { Component } from 'react'
import SettingsView from '../components/SettingsView'
import { connect } from 'react-redux'

import { updateUser } from '../reducers/user'

class Settings extends Component {
  submit = user => {
    this.props.dispatch(updateUser(user))
    this.props.navigation.pop()
  }

  render() {
    const { navigation, username } = this.props

    return (
      <SettingsView
        username={username}
        navigation={navigation}
        onSubmit={this.submit}
      />
    )
  }
}

export default connect(state => ({
  username: state.user.username,
}))(Settings)
