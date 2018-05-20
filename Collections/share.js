import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Title } from './components/Text'
import SectionTitle from './components/SectionTitle'
import Content from './components/Content'
import styled from 'styled-components/native'
import ShareExtension from 'react-native-share-extension'
import Modal from 'react-native-modalbox'

import ModalItemsList from './components/ModalItemsList'

const Container = styled.View`
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 24px 0;
`

const ModalTitle = styled(Title)`
  padding-bottom: 12px;
`

export default class Share extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      type: '',
      value: '',
    }
  }

  async componentDidMount() {
    try {
      const { type, value } = await ShareExtension.data()
      this.setState({
        type,
        value,
      })
    } catch (e) {
      console.log('errrr', e)
    }
  }

  componentWillUnmount() {
    this.close()
  }

  close = () => {
    this.setState({ value: '' }, () => ShareExtension.close())
  }

  render() {
    if (!this.state.value) {
      return null
    }

    return (
      <Container>
        <Content>
          <TouchableOpacity onPress={() => ShareExtension.close()}>
            <ModalTitle>Share to:</ModalTitle>
          </TouchableOpacity>
          <ModalItemsList close={this.close} url={this.state.value} />
        </Content>
      </Container>
    )
  }
}
