import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      error: false
    };
  }

  incrementCount = event => {
    this.setState({
      count: this.state.count + 1,
      error: false
    });
  };

  decrementCount = event => {
    if (this.state.count === 0) {
      this.setState({ error: true });
    } else if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1
      });
    }
  };

  render() {
    return (
      <div className="App" data-test="component-app">
        <h2>Counter App</h2>
        <h1 data-test="component-display">{this.state.count}</h1>
        {this.state.error ? (
          <h2 data-test="error-message">Counter cannot be less than 0</h2>
        ) : null}
        <div>
          <button onClick={this.incrementCount} data-test="increment-button">
            +
          </button>
          <button onClick={this.decrementCount} data-test="decrement-button">
            -
          </button>
        </div>
      </div>
    );
  }
}

export default App;
