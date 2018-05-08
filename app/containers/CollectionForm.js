import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

import { GET_COLLECTIONS } from './Collections'

import CollectionFormView from '../components/CollectionFormView'

const CREATE_COLLECTION = gql`
  mutation createCollection($name: String!, $description: String) {
    createCollection(name: $name, description: $description) {
      id
      __typename
      name
      createdAt
      description
    }
  }
`

class CollectionForm extends Component {
  submit = createCollection => (name, description) => {
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
        {createCollection => {
          return (
            <CollectionFormView
              navigation={navigation}
              onSubmit={this.submit(createCollection)}
            />
          )
        }}
      </Mutation>
    )
  }
}

export default CollectionForm
