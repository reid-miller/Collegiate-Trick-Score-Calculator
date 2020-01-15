import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import trickListText from './data.js';

import Trick from './Trick'

class TrickList extends React.Component {

  handleClick(points) {
    console.log(points);
    this.props.onClick(this.props.name);
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
        elements.push(<Trick name={ name } trickCode={trick[0]} score2Ski={trick[1]} score1Ski={trick[2]}
        trickWakeCode={trick[3]} scoreWake2Ski={trick[4]} scoreWake1Ski={trick[5]} onClick={(data) => this.props.onClick(data)}/>);
    }
    return (
      <div>
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
      score: 0,
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

  // Update score
  handleClick(i) {
    console.log(i);
    this.setState({ score: parseInt(this.state.score, 10) + parseInt(i, 10) })
  }

  render() {
    const score = this.state.score;
    return (
      <div class="application">
      <h1 id="title">Trick Calculator</h1>
      <div class="text-center">{score}</div>
        <div class="container">
          <TrickList 
          onClick={(i) => this.handleClick(i)}
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
