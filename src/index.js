import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import trickListText from './data.js';

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
    //Create trick buttons and components
    var arr=trickListText.split("\n");
    var elements=[];
    // push the component to elements
    for(var i=0;i<arr.length;i++){
        var trick = arr[i]; // String of trick with name and score

        //name of element
        var name = trick.substring(0, trick.indexOf("-")-1);
        trick = trick.substring(trick.indexOf("-") + 2, trick.length); // Cut off info we already have
        trick = trick.split(" ");
        elements.push(<TrickButton name={ name } trickCode={trick[0]} score2Ski={trick[1]} score1Ski={trick[2]}
        trickWakeCode={trick[3]} scoreWake2Ski={trick[4]} scoreWake1Ski={trick[5]}/>);
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

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tricks: [{
        spins: Array(9).fill(null),
        stepovers: Array(9).fill(null),
        toes: Array(9).fill(null),
        flips: Array(9).fill(null),
        skilines: Array(9).fill(null),
      }],
    }
    this.addTricks();
  }

  addTricks() {
    console.log(trickListText);
    console.log("da");
    console.log(trickListText.split("\n"));
  }

  render() {
    return (
      <div className="application">
      <h1 id="title">Trick Calculator</h1>
        <div className="button-board">
          <TrickList 
          spins={this.state.spins}
          stepovers={this.state.stepovers}
          toes={this.state.toes}
          flips={this.state.flips}
          skilines={this.state.skilines}
          />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
