import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import trickListText from './data.js';
import Trick from './Trick'

class TrickList extends React.Component {

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
        trickWakeCode={trick[3]} scoreWake2Ski={trick[4]} scoreWake1Ski={trick[5]} 
        onClick={(data, front, trick) => this.props.onClick(data, front, trick)} oneSki={this.props.oneSki} wake={this.props.wake} front={this.props.front} trick={i}/>);
        } else {
          typeOfTrick += 1;
        }
    }
    return (
      <div>
        <div className="trick-container row">
          <div className="d-flex flex-column"><h3>Spins</h3>{spins}</div>
          <div className="d-flex flex-column"><h3>Stepovers</h3>{stepovers}</div>
          <div className="d-flex flex-column"><h3>Toes</h3>{toes}</div>
          <div className="d-flex flex-column"><h3>Flips</h3>{flips}</div>
          <div className="d-flex flex-column"><h3>Skilines</h3>{skilines}</div>
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
      oneSki : true,
      wake: false,
      front: true,
      done: Array(60).fill(false),
      doneRev: Array(60).fill(false),
    }
  }

  // Update score
  handleClick(score, front, trick) {
    
    //Check if the trick has been done
    const done = this.state.done;
    if(done[trick]) {
      alert("Trick has already been done");
    } else {
    if(score === "%") {
      alert("You cant do that");
    } else {
      done[trick] = true;
    this.setState({ score: parseInt(this.state.score, 10) + parseInt(score, 10),
                    front: front,
                    done: done,
                  })
    }
  }
}

  switchWake(){
    this.setState({wake: !this.state.wake})
  }

  switchSki() {

    //Let the user know that their score will reset
    confirmAlert({
      title: 'What Type of Ski Would You Like to Use?',
      message: 'Note: Score will reset when switching skis!',
      buttons: [
        {
          label: 'One Ski',
          onClick: () => this.setState({oneSki: true})
        },
        {
          label: 'Two Ski',
          onClick: () => this.setState({oneSki: false})
        },
        {
          label: 'Wake Board',
          onClick: () => alert("Sorry can't do that just yet!")
        },
        {
          label: 'Knee Board',
          onClick: () => alert("Sorry can't do that just yet!")
        }
      ]
    });

    this.reset();
  }
  //Reset score
  reset() {
    this.setState({score: 0, front: true, done: Array(60).fill(false)}); // Reset Score
    
  }

  render() {
    const score = this.state.score;
    return (
      <div className="application">
        <h1 className="text-center">Trick Calculator</h1>
        <div className="text-center">{score}</div>
        <div>{this.state.front ? "Front" : "Back"}</div>
        <div className="text-center">
        <button onClick={() => this.reset()}>Reset</button>
        <div>You are on {this.state.oneSki ? "one ski" : "two skis"}</div>
        <button onClick={() => this.switchSki()}>Switch Ski</button>
        <button onClick={() => this.switchWake()}>{this.state.wake ? "Surface" : "Wake"}</button>
        </div>

        <div>
          <TrickList 
          onClick={(score, front, trick) => this.handleClick(score, front, trick)}
          spins={this.state.spins}
          stepovers={this.state.stepovers}
          toes={this.state.toes}
          flips={this.state.flips}
          skilines={this.state.skilines}
          oneSki={this.state.oneSki}
          wake={this.state.wake}
          front={this.state.front}
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
