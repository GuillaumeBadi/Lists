import React, { Component } from 'react'
import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/Ionicons'
import Input from './Input'

import { Title, Description } from './Text'
import Content from './Content'
import Header from './Header'

const Container = styled.View`
  flex: 1;
  background-color: white;
`

const Form = styled.View`
  width: 240px;
  padding-top: 24px;
  padding-bottom: 24px;
`

const PaddedDescription = styled(Description)`padding-top: 6px;`

const InputContainer = styled.View`
  padding-top: 12px;
  padding-bottom: 12px;
`

const Submit = styled(Content)`
  align-items: flex-end;
  padding-top: 24px;
  padding-bottom: 24px;
`

class CollectionFormView extends Component {
  state = {
    name: '',
    description: '',
  }

  renderBack = () => {
    return (
      <Icon
        onPress={() => this.props.navigation.pop()}
        name="md-arrow-back"
        size={20}
        color="#424242"
      />
    )
  }

  render() {
    const { onSubmit } = this.props

    return (
      <Container>
        <Header renderLeft={this.renderBack} />
        <Content>
          <Title>Describe your new collection</Title>
          <PaddedDescription>
            Don’t worry, you can change it later.
          </PaddedDescription>
          <Form>
            <InputContainer>
              <Input
                label="Name"
                placeholder="My news collection"
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
              />
            </InputContainer>
            <InputContainer>
              <Input
                label="Description"
                multiline
                placeholder="My source of interesting news around the world"
                value={this.state.description}
                onChangeText={text => this.setState({ description: text })}
              />
            </InputContainer>
          </Form>
        </Content>
        <Submit>
          <Icon
            onPress={() => onSubmit(this.state.name, this.state.description)}
            name="md-arrow-forward"
            size={24}
            color="#424242"
          />
        </Submit>
      </Container>
    )
  }
}

export default CollectionFormView
