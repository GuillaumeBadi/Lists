import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Title } from './components/Text'
import SectionTitle from './components/SectionTitle'
import Content from './components/Content'
import styled from 'styled-components/native'
import ShareExtension from 'react-native-share-extension'

import ModalItemsList from './components/ModalItemsList'

const { width, height } = Dimensions.get('window')

const Container = styled.View`
  position: absolute;
  width: ${width};
  height: 300px;
  background-color: white;
  padding: 24px 0;
  bottom: 0;
`

const Wrapper = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${width};
  height: ${height};
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
      <Wrapper>
        <Container>
          <Content>
            <TouchableOpacity onPress={() => ShareExtension.close()}>
              <ModalTitle>Share to:</ModalTitle>
            </TouchableOpacity>
          </Content>
        </Container>
      </Wrapper>
    )
  }
}
