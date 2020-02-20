import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import trickListText from './data.js';
import Trick from './Trick';
import InputField from './InputField';


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
        onClick={(data, front, trick, reverse) => this.props.onClick(data, front, trick, reverse)} oneSki={this.props.oneSki} wake={this.props.wake} front={this.props.front} trick={i} lastTrick={this.props.lastTrick}/>);
        } else {
          typeOfTrick += 1;
        }
    }
    console.log(elements);
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
      done: Array(60), // 0 is normal, 1 is reverse, 2 is wake, 3 is wake reverse
      lastTrick: null,
      value: '',
      tricks: this.setUp(),
    }

    var createDone = this.state.done;

    for(var i = 0; i < createDone.length; i++) {
      createDone[i] = [false, false, false, false];
    }

    console.log("RR");
    console.log(this.state.tricks);
    console.log("RR");
  }
/*
  // Update score
  handleClick(score, front, trick, reverse) {
    
    

    if(reverse) {
      if(done[trick]) {
        alert("Trick has already been done");
      } else {
      if(score === "%") {
        alert("You cant do that");
        return;
      } else {
        done[trick] = true;
      }
    }
  }
  else {
    //trick = null; //So it does not thinks it's another reverse
    if(doneRev[trick]) {
      alert("Trick has already been done");
    } else {
    if(score === "%") {
      alert("You cant do that");
      return;
    } else {
      doneRev[trick] = true;
    }
  }
}

    this.setState({ score: parseInt(this.state.score, 10) + parseInt(score, 10),
      front: front,
      done: done,
      doneRev: doneRev,
      lastTrick: trick,
    })
  }
*/
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
    this.setState({score: 0, front: true, done: Array(60).fill(false), doneRev: Array(60).fill(false)}); // Reset Score   
  }

  //Called when enter is pressed in the input field
  handleSubmit(trickCode) {

    var wake = false;
    var reverse = 0; // 0 if normal, 1 if reverse 
    var ski; // Based off what type of ski they are on
    
    // Find the related trick
    var tricks = this.state.tricks;
    var trick = null;
    for (var i = 0; i < tricks.length; i++) {
      for (var j = 0; j < tricks[i].length; j++) {
        if(tricks[i][j].trickCode === trickCode) {
          trick = tricks[i][j];
          break;
        } else if (tricks[i][j].trickWakeCode === trickCode) {
          wake = true;
          trick = tricks[i][j];
        }
      }
    }

    // If we did not find the trick
    if (trick === null) {
      console.log("Trick not found");
      return;
    }
        
    //Check if the trick has been done
    const done = this.state.done; // 0 is normal, 1 is reverse, 2 is wake, 3 is wake reverse
    var toAdd = 0; // Amount to add to score

    console.log(done);

    if(wake) {
      if(done[trick.trick][2 + reverse] === false) {
        done[trick.trick][2] = true;
        toAdd = trick.scoreWake1Ski;
      }
    } else {
      if(done[trick.trick][0 + reverse] === false) {
        done[trick.trick][0 + reverse] = true;
        toAdd = trick.score1Ski;
      }
    }

    console.log("toAdd =" + toAdd);
    this.score(toAdd);
    this.setState({done: done});
  }
 
  //Add to score
  score(amount) {
    this.setState({ score: parseInt(this.state.score, 10) + parseInt(amount, 10)});
  }

  setUp() {
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

        var obj = {
          name: name,
          trickCode: trick[0],
          score2Ski: trick[1],
          score1Ski: trick[2],
          trickWakeCode: trick[3],
          scoreWake2Ski: trick[4],
          scoreWake1Ski: trick[5],
          trick: i,
        }
        elements[typeOfTrick].push(obj);
        /*
        elements[typeOfTrick].push(<Trick name={ name } trickCode={trick[0]} score2Ski={trick[1]} score1Ski={trick[2]}
        trickWakeCode={trick[3]} scoreWake2Ski={trick[4]} scoreWake1Ski={trick[5]} 
        onClick={(data, front, trick, reverse) => this.props.onClick(data, front, trick, reverse)} oneSki={this.props.oneSki} wake={this.props.wake} front={this.props.front} trick={i} lastTrick={this.props.lastTrick}/>);*/
        } else {
          typeOfTrick += 1;
        }
    }
    return elements;
  }

  render() {
    const score = this.state.score;
    // <img src={require('./trickski.jpg')} height="150px" width="150px" alt="dwq"/> to add photo
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

        <InputField
        onSubmit={(trickCode) => this.handleSubmit(trickCode)}
        />

      </div>
    );
  }
}

/*

<div>
          <TrickList 
          onClick={(score, front, trick, reverse) => this.handleClick(score, front, trick, reverse)}
          spins={this.state.spins}
          stepovers={this.state.stepovers}
          toes={this.state.toes}
          flips={this.state.flips}
          skilines={this.state.skilines}
          oneSki={this.state.oneSki}
          wake={this.state.wake}
          front={this.state.front}
          lastTrick={this.state.lastTrick}
          />
        </div>

*/


// ========================================

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
