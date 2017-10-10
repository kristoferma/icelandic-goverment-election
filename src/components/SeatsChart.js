import React, { Component } from 'react'
import styled from 'styled-components'

import { VictoryPie } from 'victory'
import { PieChart, Pie } from 'recharts'

const SeatDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const data01 = [
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group D', value: 100 },
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 }
]

const data02 = [
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group D', value: 100 },
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 }
]
const data03 = [
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group D', value: 100 },
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 }
]
const data04 = [
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group D', value: 100 },
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 }
]
const data05 = [
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group D', value: 100 },
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 }
]
const data06 = [
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group D', value: 100 },
  { name: 'Group A', value: 100 },
  { name: 'Group B', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 },
  { name: 'Group C', value: 100 }
]

export default class extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      data: props.data
    }
    this.pieClickHandler = this.pieClickHandler.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }

  pieClickHandler(value) {
    console.log('clickData', value)
    this.setState(
      (prevState, props) => {
        console.log('prevState', prevState.data[value.index])
        prevState.data[value.index].isInMajority = !prevState.data[value.index]
          .isInMajority
        return prevState
      },
      () => this.forceUpdate()
    )
  }

  render() {
    return (
      <SeatDiv>
        <h2>Dreifing þingsæta</h2>
        <PieChart width={730} height={500}>
          <Pie
            value={data01}
            data={data01}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
          />
          <Pie
            data={data02}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={90}
            outerRadius={110}
            fill="#82ca9d"
          />
          <Pie
            data={data03}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={120}
            outerRadius={140}
            fill="#8884d8"
          />
          <Pie
            data={data04}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={150}
            outerRadius={170}
            fill="#82ca9d"
          />
          <Pie
            data={data05}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={180}
            outerRadius={200}
            fill="#82ca9d"
          />
          <Pie
            data={data06}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={210}
            outerRadius={230}
            fill="#82ca9d"
          />
        </PieChart>
        <VictoryPie
          data={this.state.data}
          startAngle={-90}
          endAngle={90}
          innerRadius={100}
          eventKey={datum => datum.label}
        />
      </SeatDiv>
    )
  }
}
