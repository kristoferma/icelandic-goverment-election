import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'

import calculateSeats from './seat-calculation.js'
import mmr from './mmr-28-09-17.js'
import partyColor from './party-colors.js'

import { VictoryPie } from 'victory'

const FlexContainer = styled.div`display: flex;`

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
          <VictoryPie data={formatSurveyData(mmr)} />
          <VictoryPie data={formatData(calculateSeats(mmr))} />
        </FlexContainer>
      </div>
    )
  }
}

export default App
