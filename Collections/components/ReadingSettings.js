import React, { Component } from 'react'
import { Animated, TouchableOpacity, Alert, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import Slider from 'react-native-slider'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

class ReadingSettings extends Component {
  state = {
    opacity: new Animated.Value(0),
    offset: new Animated.Value(-400),
    pointerEvents: 'none',
  }

  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  close() {
    Animated.parallel([
      Animated.spring(this.state.offset, { toValue: -400 }),
      Animated.spring(this.state.opacity, { toValue: 0 }),
    ]).start()
    this.setState({ pointerEvents: 'none' })
  }

  open() {
    this.setState({
      pointerEvents: 'auto',
    })
    Animated.parallel([
      Animated.spring(this.state.offset, { toValue: -100 }),
      Animated.spring(this.state.opacity, { toValue: 0.4 }),
    ]).start()
  }

  render() {
    const { opacity, offset, pointerEvents } = this.state

    return (
      <Container pointerEvents={pointerEvents}>
        <Overlay style={{ opacity }}>
          <TouchableOpacity onPress={this.close} style={{ flex: 1 }} />
        </Overlay>
        <ReadingSettingsPanel {...this.props} offset={offset} />
      </Container>
    )
  }
}

const Container = styled(Animated.View)`
  flex: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
`

const Page = styled.TouchableOpacity`
  flex: 1;
`

const Overlay = styled(Animated.View)`
  background-color: black;
  flex: 1;
`

const Label = styled.Text`
  font-family: EBGaramond-SemiBold;
  color: white;
  font-size: 14px;
`

const SettingsContainer = styled(Animated.View)`
  position: absolute;
  height: 400px;
  width: 100%;
  background-color: #1f2831;
  padding: 24px 0;
`

const Theme = styled.View`
  width: 40;
  height: 40;
  border-radius: 40;
  background-color: ${props => props.color};
  ${props =>
    props.selected &&
    `
    border-width: 1;
    border-color: #222B33;
  `} margin-right: 24px;
`

const ThemesList = styled.ScrollView``

const Themes = styled.View`
  margin: 12px 0;
  height: 50;
  flex-direction: row;
`

const SettingsItem = styled.View`
  padding: 12px 48px;
`

class ReadingSettingsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = { fontSize: props.fontSize }
  }

  triggerChange = () => {
    this.props.onChangeFontSize(this.state.fontSize)
  }

  updateChange = fontSize => {
    this.setState(state => ({ ...state, fontSize }))
  }

  render() {
    const { selectedTheme, themes, offset, selectTheme } = this.props
    return (
      <SettingsContainer style={{ bottom: offset }}>
        <SettingsItem>
          <Label>Text Size - {this.state.fontSize}px</Label>
          <Slider
            animateTransitions
            value={this.state.fontSize}
            step={1}
            onValueChange={this.updateChange}
            onSlidingComplete={this.triggerChange}
            minimumValue={12}
            maximumValue={24}
            thumbTintColor="white"
            minimumTrackTintColor="white"
            maximumTrackTintColor="#a0a0a0"
          />
        </SettingsItem>
        <SettingsItem>
          <Label>Theme</Label>
          <ThemesList horizontal vertical={false}>
            <Themes>
              {themes.map((theme, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={1}
                  onPress={selectTheme(i)}
                >
                  <Theme color={theme.background} />
                </TouchableOpacity>
              ))}
            </Themes>
          </ThemesList>
        </SettingsItem>
      </SettingsContainer>
    )
  }
}

export default ReadingSettings
