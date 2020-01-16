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
    var spins=[];
    var stepovers=[];
    var toes=[];
    var flips=[];
    var skilines=[];
    var elements=[spins, stepovers, toes, flips, skilines];
    // push the component to elements

    var typeOfTrick = 0;
    for(var i=0;i<arr.length;i++){
        var trick = arr[i]; // String of trick with name and score

        if(trick !== "@") {
        //name of element
        var name = trick.substring(0, trick.indexOf("-")-1);
        trick = trick.substring(trick.indexOf("-") + 2, trick.length); // Cut off info we already have
        trick = trick.split(" ");
        elements[typeOfTrick].push(<Trick name={ name } trickCode={trick[0]} score2Ski={trick[1]} score1Ski={trick[2]}
        trickWakeCode={trick[3]} scoreWake2Ski={trick[4]} scoreWake1Ski={trick[5]} onClick={(data) => this.props.onClick(data)}/>);
        } else {
          typeOfTrick += 1;
        }
    }
    return (
      <div>
        <div className="trick-container row">
          <div className="d-flex flex-column"><h3>Spins</h3>{spins}</div>
          <div className="d-flex flex-column"><h3>Stepovers</h3>{stepovers}</div>
          <div className="d-flex flex-column">{toes}</div>
          <div className="d-flex flex-column">{flips}</div>
          <div className="d-flex flex-column">{skilines}</div>
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
      <div className="application">
      <h1 className="text-center">Trick Calculator</h1>
      <div className="text-center">{score}</div>
        <div>
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
