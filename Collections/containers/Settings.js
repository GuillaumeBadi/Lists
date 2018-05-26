import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SettingsView from '../components/SettingsView'

import Loading from '../components/Loading'

const GET_VIEWER = gql`
  query {
    viewer {
      username
      __typename
      id
    }
  }
`

class Settings extends Component {
  submit = user => {
    this.props.dispatch(updateUser(user))
    this.props.navigation.pop()
  }

  logout = async () => {
    await AsyncStorage.removeItem('token')
    this.props.navigation.navigate('Auth')
  }

  render() {
    const { navigation, username } = this.props

    return (
      <Query query={GET_VIEWER}>
        {({ error, loading, data: { viewer: { username } = {} } = {} }) => {
          if (loading) {
            return <Loading />
          }
          if (error) {
            console.log(error)
          }
          return (
            <SettingsView
              logout={this.logout}
              username={username}
              navigation={navigation}
              onSubmit={this.submit}
            />
          )
        }}
      </Query>
    )
  }
}

export default Settings
