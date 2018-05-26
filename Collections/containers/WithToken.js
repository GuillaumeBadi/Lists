import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_TOKEN = gql`
  query {
    viewer {
      jwt
    }
  }
`
class WithToken extends Component {
  state = {
    isLogged: false,
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(
      token => !!token && this.setState({ isLogged: true }),
    )
  }

  render() {
    const { logged: Logged, notLogged: NotLogged } = this.props
    const { isLogged } = this.state

    if (isLogged) {
      return <Logged />
    }

    return (
      <Query query={GET_TOKEN}>
        {({ loading, error, data: { jwt } }) => {
          console.log(loading, jwt, error)
          if (loading) {
            return null
          }
          if (error || !jwt) {
            return <NotLogged update={this.update} />
          }
          return <Logged token={jwt} update={this.update} />
        }}
      </Query>
    )
  }
}

export default WithToken
