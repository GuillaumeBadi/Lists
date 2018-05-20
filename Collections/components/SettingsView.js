import React, { Component } from 'react'
import styled from 'styled-components/native'

import Icon from './HeaderIcon'
import Input from './Input'

import SectionTitle from './SectionTitle'
import { Description } from './Text'
import Content from './Content'
import Header from './Header'

const PaddedContent = styled(Content)`
  padding-top: 12px;
`

const Container = styled.View`
  flex: 1;
  background-color: white;
`

const Form = styled.View`
  width: 240px;
  padding-top: 24px;
  padding-bottom: 24px;
`

const PaddedDescription = styled(Description)`
  padding-top: 6px;
`

const InputContainer = styled.View`
  padding-top: 12px;
  padding-bottom: 12px;
`

const Submit = styled(Content)`
  align-items: flex-end;
  padding-top: 24px;
  padding-bottom: 24px;
`

class SettingsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
    }
  }

  renderBack = () => {
    return (
      <Icon
        onPress={() => this.props.navigation.pop()}
        name="md-arrow-back"
        size={20}
        color="#fff"
      />
    )
  }

  render() {
    const { onSubmit } = this.props

    return (
      <Container>
        <Header renderLeft={this.renderBack} />
        <SectionTitle paddedBottom={false}>
          Update your personal informations
        </SectionTitle>
        <Content>
          <PaddedDescription>
            We use your data to provide a smoother experience
          </PaddedDescription>
        </Content>
        <PaddedContent>
          <Form>
            <InputContainer>
              <Input
                label="Username"
                placeholder="My news collection"
                value={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              />
            </InputContainer>
          </Form>
        </PaddedContent>
        <Submit>
          <Icon
            onPress={() => onSubmit({ username: this.state.username })}
            name="md-arrow-forward"
            size={24}
            color="#424242"
          />
        </Submit>
      </Container>
    )
  }
}

export default SettingsView
