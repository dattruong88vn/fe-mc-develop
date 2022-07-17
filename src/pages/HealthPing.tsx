import React, { Component, CSSProperties } from 'react'

export default class HealthPing extends Component {
  render() {
    return (
      <div style={container}>
          <h2>Pong</h2>
      </div>
    )
  }
}

const container: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center'
}