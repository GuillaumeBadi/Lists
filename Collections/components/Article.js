import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import config from '../config'

import { updateTheme } from '../reducers/user'

import ReadingSettings from './ReadingSettings'

import { Divider, LightLabel } from './ListItem'
import { Title } from './Text'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

const data = require('../data.json')

const BaseText = styled.Text`
  font-size: 18px;
`

const Div = styled.View`
  padding: 12px 48px;
`
const P = styled.Text`
  padding: 12px 0;
  font-size: ${props => props.theme.fontSize};
  font-family: EBGaramond-Medium;
`

const Gradient = styled(LinearGradient)`
  width: 100%;
  height: 200px;
  margin-top: ${HEIGHT + 50}px;
`

const Text = styled.Text`
  color: ${props => props.theme.textColor};
`

const Em = styled.Text``

const H3 = styled.Text`
  font-family: EBGaramond-SemiBold;
  width: 100%;
  font-size: 30px;
  padding-top: 64px;
  padding-bottom: 24px;
`

const Image = styled.Image``

function renderElement({ type, text, childs, src }) {
  switch (type) {
    case 'h3':
      return <H3>{childs.map(renderElement)}</H3>
    case 'em':
      return <Em>{childs.map(renderElement)}</Em>
    case 'figure':
      return null
    case 'div':
      return <Div>{childs.map(renderElement)}</Div>
    case 'text':
      return <Text>{text}</Text>
    case 'p':
      return <P>{childs.map(renderElement)}</P>
    case 'img':
      return <Image source={{ uri: src }} />
    case 'title':
      return <P>{text}</P>
    default:
      return <P>invalid type: {type}</P>
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: 96px 0;
`

const TitleContainer = styled.View`
  height: ${HEIGHT};
  width: ${WIDTH};
  align-items: baseline;
  justify-content: flex-end;
  position: absolute;
  padding: 0px 48px 24px 48px;
`

const ArticleTitle = styled(Title)`
  color: ${props => props.theme.textColor};
  font-size: 40px;
`

const List = styled(ScrollView)`
  position: relative;
`

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`

class Article extends Component {
  static defaultProps = { data }

  state = {
    fontSize: 18,
  }

  onChangeFontSize = fontSize => {
    this.setState(state => ({ ...state, fontSize }))
  }

  openSettings = () => this.settingsView.open()

  selectTheme = i => () => {
    this.props.dispatch(updateTheme(i))
  }

  render() {
    const {
      data: { tree, title },
      theme,
    } = this.props

    const { fontSize } = this.state

    console.log(theme)

    return (
      <ThemeProvider theme={{ ...theme, fontSize }}>
        <Wrapper>
          <TitleContainer>
            <LightLabel>LeMonde.fr</LightLabel>
            <Divider />
            <ArticleTitle>{title}</ArticleTitle>
          </TitleContainer>
          <List onScroll={this.scroll}>
            <TouchableOpacity activeOpacity={1} onPress={this.openSettings}>
              <Gradient colors={['transparent', theme.background]} />
              <Container>{tree.map(renderElement)}</Container>
            </TouchableOpacity>
          </List>
          <ReadingSettings
            selectedTheme={theme}
            themes={config.read.themes}
            fontSize={fontSize}
            ref={r => (this.settingsView = r)}
            selectTheme={this.selectTheme}
            onChangeFontSize={this.onChangeFontSize}
          />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default connect(state => ({
  theme: config.read.themes[state.user.theme],
}))(Article)
