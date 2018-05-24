import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import CollectionFormView from '../components/CollectionFormView'

import Loading from '../components/Loading'

import { GET_COLLECTIONS } from './Collections'

const CREATE_COLLECTION = gql`
  mutation createCollection($name: String!, $description: String) {
    createCollection(name: $name, description: $description) {
      __typename
      id
      name
      description
    }
  }
`

class CollectionForm extends Component {
  submit = createCollection => ({ name, description }) => {
    createCollection({ variables: { name, description } })
    this.props.navigation.pop()
  }

  render() {
    const { navigation } = this.props

    return (
      <Mutation
        mutation={CREATE_COLLECTION}
        update={(cache, { data: { createCollection } }) => {
          const data = cache.readQuery({ query: GET_COLLECTIONS })
          data.viewer.collections.nodes.unshift(createCollection)
          cache.writeQuery({ query: GET_COLLECTIONS, data })
        }}
      >
        {(createCollection, { loading }) =>
          loading ? (
            <Loading />
          ) : (
            <CollectionFormView
              navigation={navigation}
              onSubmit={this.submit(createCollection)}
            />
          )
        }
      </Mutation>
    )
  }
}

export default CollectionForm
