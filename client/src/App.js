import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  incrementCount = event => {
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    return (
      <div className="App" data-test="component-app">
        <h2>Hello world!</h2>
        <h1 data-test="component-display">{this.state.count}</h1>
        <button onClick={this.incrementCount} data-test="component-button">
          +
        </button>
      </div>
    );
  }
}

export default App;
