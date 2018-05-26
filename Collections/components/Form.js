import React, { Component } from 'react'
import styled from 'styled-components/native'

import Icon from './HeaderIcon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Input from './Input'

import SectionTitle from './SectionTitle'
import { Description } from './Text'
import Content from './Content'
import Header from './Header'

const PaddedContent = styled(Content)`
  padding-top: 12px;
`

const Error = styled.Text`
  font-family: EBGaramond-Medium;
  color: red;
  font-size: 13px;
`

const SubmitIcon = styled(Ionicons)`
  padding: 24px;
`

const Container = styled.View`
  flex: 1;
  background-color: white;
`

const Wrapper = styled.View`
  width: 240px;
  padding-top: 12px;
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

class Form extends Component {
  static defaultProps = {
    displayHeader: true,
  }

  constructor(props) {
    super(props)
    const fields = props.fields.map(f => f.name)
    this.state = { fields }
  }

  updateField = field => text => {
    this.setState({ fields: { ...this.state.fields, [field]: text } })
  }

  renderBack = color => {
    return (
      <Icon
        onPress={() => this.props.navigation.pop()}
        name="md-arrow-back"
        size={20}
        color={color}
      />
    )
  }

  submit = () => {
    const { fields } = this.state
    const results = this.props.fields.reduce((p, c) => {
      return { ...p, [c.name]: fields[c.name] }
    }, {})
    return this.props.onSubmit(results)
  }

  render() {
    const {
      displayHeader,
      onSubmit,
      title,
      description,
      fields,
      error,
    } = this.props

    return (
      <Container>
        {displayHeader && <Header renderLeft={this.renderBack} />}
        <SectionTitle paddedBottom={false}>{title}</SectionTitle>
        <Content>
          <PaddedDescription>{description}</PaddedDescription>
          {error && <Error>{error}</Error>}
        </Content>
        <PaddedContent>
          <Wrapper>
            {fields.map(f => (
              <InputContainer key={f.name}>
                <Input
                  label={f.label}
                  placeholder={f.placeholder}
                  value={this.state.fields[f.name]}
                  onChangeText={this.updateField(f.name)}
                />
              </InputContainer>
            ))}
          </Wrapper>
        </PaddedContent>
        <Submit>
          <SubmitIcon
            onPress={this.submit}
            name="md-arrow-forward"
            size={24}
            color="#424242"
          />
        </Submit>
      </Container>
    )
  }
}

export default Form
