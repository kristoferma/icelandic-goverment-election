import React, { Component } from 'react'
import styled from 'styled-components'

import { VictoryPie } from 'victory'
import { PieChart, Pie, Cell } from 'recharts'

const SeatDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export default class extends Component {
  constructor(props) {
    super(props)
    const seats = this.formatData(props.data)
    this.state = {
      data: props.data,
      seats,
    }
    this.pieClickHandler = this.pieClickHandler.bind(this)
    this.cellHover = this.cellHover.bind(this) 
    this.cellStopHover = this.cellStopHover.bind(this) 
  }

  // The ugliest function around 😎
  formatData(data) {
    const seats = {
      row1: [],
      row2: [],
      row3: [],
      row4: [],
      row5: [],
      row6: [],
    }
    let seatNumber = 1;
    data.forEach((party) => {
      for(let i = 0; i < party.y; i++) {
        if (seatNumber === 1) {
          if (seats.row1.length > 7) {
            seatNumber = 2
          } else {
            seats.row1.push({
              name: party.name,
              value: 100,
              color: party.fill,
            })
          }
        }
        if (seatNumber === 2) {
          if (seats.row2.length > 8) {
            seatNumber = 3
          } else {
            seats.row2.push({
              name: party.name,
              value: 100,
              color: party.fill,
            })
          }
        }
        if (seatNumber === 3) {
          if (seats.row3.length > 9) {
            seatNumber = 4
          } else {
            seats.row3.push({
              name: party.name,
              value: 100,
              color: party.fill,
            })
          }
        }
        if (seatNumber === 4) {
          if (seats.row4.length > 10) {
            seatNumber = 5
          } else {
            seats.row4.push({
              name: party.name,
              value: 100,
              color: party.fill,
            })
          }
        }
        if (seatNumber === 5) {
          if (seats.row5.length > 11) {
            seatNumber = 6
          } else {
            seats.row5.push({
              name: party.name,
              value: 100,
              color: party.fill,
            })
          }
        }
        if (seatNumber === 6) {
          if (seats.row6.length <= 12) {
            seats.row6.push({
              name: party.name,
              value: 100,
              color: party.fill,
            })
          }
        }
        if (seatNumber <= 5) {
          seatNumber++
        } else {
          seatNumber = 1
        }
      }
    })
    console.log(seats)
    return seats
  }

  componentWillReceiveProps(nextProps) {
    const seats = this.formatData(nextProps.data)
    this.setState({
      data: nextProps.data,
      seats,
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

  cellHover(rowNum, seat, index) {
    console.log('DID HOVER')
    console.log(rowNum)
    console.log(seat)
    console.log(index)
  }

  cellStopHover(rowNum, seat, index) {
    console.log('LEFT HOVER')
    console.log(rowNum)
    console.log(seat)
    console.log(index)
  }

  render() {
    return (
      <SeatDiv>
        <h2>Dreifing þingsæta</h2>
        <PieChart width={730} height={500}>
          <Pie
            data={this.state.seats.row1}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
          >
            {
              this.state.seats.row1.map((seat, index) => 
                <Cell 
                  onMouseEnter={this.cellHover(1, seat, index)}
                  onMouseLeave={this.cellStopHover(1, seat, index)}
                  key={index} 
                  fill={seat.color}
              />)
            }
          </Pie>
          <Pie
            data={this.state.seats.row2}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={90}
            outerRadius={110}
            fill="#82ca9d"
          >
            {
              this.state.seats.row2.map((entry, index) => <Cell key={index} fill={entry.color}/>)
            }
          </Pie>
          <Pie
            data={this.state.seats.row3}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={120}
            outerRadius={140}
            fill="#8884d8"
          >
            {
              this.state.seats.row3.map((entry, index) => <Cell key={index} fill={entry.color}/>)
            }
          </Pie>
          <Pie
            data={this.state.seats.row4}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={150}
            outerRadius={170}
            fill="#82ca9d"
          >
            {
              this.state.seats.row4.map((entry, index) => <Cell key={index} fill={entry.color}/>)
            }
          </Pie>
          <Pie
            data={this.state.seats.row5}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={180}
            outerRadius={200}
            fill="#82ca9d"
          >
            {
              this.state.seats.row5.map((entry, index) => <Cell key={index} fill={entry.color}/>)
            }
          </Pie>
          <Pie
            data={this.state.seats.row6}
            cx="50%"
            cy="50%"
            endAngle={180}
            innerRadius={210}
            outerRadius={230}
            fill="#82ca9d"
          >
            {
              this.state.seats.row6.map((entry, index) => <Cell key={index} fill={entry.color}/>)
            }
          </Pie>
        </PieChart>
        <VictoryPie
          data={this.state.data}
          startAngle={-90}
          endAngle={90}
          innerRadius={100}
          paddingAngle={8}
          eventKey={datum => datum.label}
        />
      </SeatDiv>
    )
  }
}
