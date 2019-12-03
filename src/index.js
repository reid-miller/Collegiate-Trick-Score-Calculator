import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Trick from './Trick'

class TrickButton extends React.Component {
  render() {
    return (
      <button className="trick-button">
        {this.props.name}
      </button>
    );
  }
}

class TrickList extends React.Component {
  
  renderTrickButton(name) {
    return <TrickButton 
    name={name}
    />;
  }

  render() {
    var arr=["one", "two", "three", "four"];
        var elements=[];
        for(var i=0;i<arr.length;i++){
             // push the component to elements!
            elements.push(<TrickButton name={ arr[i] } />);
        }
    return (
      <div>
        <div className="button-row">
          {this.renderTrickButton("Front flip")}
          {this.renderTrickButton(1)}
          {this.renderTrickButton(2)}
        </div>
        <div className="button-row">
          {this.renderTrickButton(3)}
          {this.renderTrickButton(4)}
          {this.renderTrickButton(5)}
        </div>
        <div className="button-row">
          {elements}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
      <h1 id="title">Trick Calculator</h1>
        <div className="game-board">
          <TrickList />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
