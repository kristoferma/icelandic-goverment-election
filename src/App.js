import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'
import 'react-select/dist/react-select.css'

import calculateSeats from './seat-calculation.js'
import surveys from './surveys.js'
import partyColor from './party-colors.js'

import { VictoryPie } from 'victory'
import Select from 'react-select'


const FlexContainer = styled.div`display: flex;`

const SurveyDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const SeatDiv = SurveyDiv

function formatSurveyData(data) {
  return data.map(({ letter, percentage }) => ({
    x: letter,
    y: percentage * 10,
    fill: partyColor(letter)
  }))
}

function formatData(data) {
  return Object.keys(data)
    .map(partyLetter => ({
      x: partyLetter,
      y: data[partyLetter].seats,
      fill: partyColor(partyLetter)
    }))
    .filter(data => data.y > 0)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { survey: surveys[0] }
  }

  onSurveyChange(data) {
    this.setState({ survey: data })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Althingi.svg/1280px-Althingi.svg.png"
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title">Kosninga leikvöllur</h1>
        </header>
        <FlexContainer>
          <SurveyDiv>
            <h2>Dreifing atkvæða</h2>
            <Select
              options={surveys}
              value={this.state.survey}
              onChange={this.onSurveyChange.bind(this)}
            />
            <VictoryPie data={formatSurveyData(this.state.survey.value)} />
          </SurveyDiv>
          <SeatDiv>
            <h2>Dreifing þingsæta</h2>
            <VictoryPie
              data={formatData(calculateSeats(this.state.survey.value))}
            />
          </SeatDiv>
        </FlexContainer>
      </div>
    )
  }
}

export default App
