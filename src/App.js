import './App.css';
import React, { Component } from 'react'

export default class App extends Component {
  c = 'chintan'
  render() {
    return (
      <div>
        Hello {this.c}
      </div>
    )
  }
}
