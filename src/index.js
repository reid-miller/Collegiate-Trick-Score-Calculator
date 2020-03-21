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
    var arr = trickListText.split("\n");
    var spins = [];
    var stepovers = [];
    var toes = [];
    var flips = [];
    var skilines = [];
    var elements = [spins, stepovers, toes, flips, skilines];
    // push the component to elements

    var typeOfTrick = 0;
    for (var i = 0; i < arr.length; i++) {
      var trick = arr[i]; // String of trick with name and score

      if (trick !== "@") {
        //name of element
        var name = trick.substring(0, trick.indexOf("-") - 1);
        trick = trick.substring(trick.indexOf("-") + 2, trick.length); // Cut off info we already have
        trick = trick.split(" ");
        elements[typeOfTrick].push(<Trick name={name} trickCode={trick[0]} score2Ski={trick[1]} score1Ski={trick[2]}
          trickWakeCode={trick[3]} scoreWake2Ski={trick[4]} scoreWake1Ski={trick[5]}
          onClick={(data, front, trick, reverse) => this.props.onClick(data, front, trick, reverse)} oneSki={this.props.oneSki} wake={this.props.wake} front={this.props.front} trick={i} lastTrick={this.props.lastTrick} />);
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
      oneSki: true,
      wake: false,
      front: true,
      tricks_done: [],
      value: '',
      tricks: this.setUp(),
      message: "",
      visual_trick_list: [],
    }
  }

  switchWake() {
    this.setState({ wake: !this.state.wake })
  }

  switchSki() {

    //Let the user know that their score will reset
    confirmAlert({
      title: 'What Type of Ski Would You Like to Use?',
      message: 'Note: Score will reset when switching skis!',
      buttons: [
        {
          label: 'One Ski',
          onClick: () => this.setState({ oneSki: true })
        },
        {
          label: 'Two Ski',
          onClick: () => alert("Sorry can't do that just yet!")
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
    this.setState({ score: 0, front: true, tricks_done: [], }); // Reset Score   
  }

  // Determines what direction you need to be to start a trick and what direction
  // you'll be after the trick. Returns start postion followed by end ex: FF, FB, BF, BB
  positon(trickCode) {

    // Tricks you must be front for
    if (!trickCode.includes("BB") && (trickCode.includes("S") || trickCode.includes("B") || trickCode.includes("FB") || trickCode.includes("FF") || trickCode.includes("O"))) {

      if (trickCode.includes("O") || trickCode.includes("FF") || trickCode.includes("S"))
        return "FF";
      else
        return "FB"

    }
    // Tricks you must be back for
    else {
      if (trickCode.includes("BB"))
        return "BB";
      else
        return "BF";
    }
  }

  // Finds trick info based off trick code
  findTrick(trickCode) {
    var tricks = this.state.tricks;
    var trick = null; 
    var wake = false;
    // Find the related trick
    for (var i = 0; i < tricks.length; i++) {
      for (var j = 0; j < tricks[i].length; j++) {
        if (tricks[i][j].trickCode === trickCode) {
          trick = tricks[i][j];
          break;
          } 
        else if (tricks[i][j].trickWakeCode === trickCode) {
          wake = true;
          trick = tricks[i][j];
        }
      }
    }

   return [trick, wake];
  }

  //Called when enter is pressed in the input field
  handleSubmit(trickCode) {

    var wake = false;
    var reverse = false;
    var ski; // Based off what type of ski they are on
    var tricks = this.state.tricks;
    var trick = null;
    var front = this.state.front;
    var message = "";

    // Check if reverse
    if (trickCode.charAt(0) === 'R') {
      reverse = true;
        if(trickCode === 'R') {
          // If it's just R than try pulling the other tricks

          // Try doing the last trick
          if(this.state.tricks_done.length - 1 < 0) {alert("This needs to be fixed")}
          var lastTrick = this.state.tricks_done[this.state.tricks_done.length - 1];
          if((front === true && this.positon(lastTrick).charAt(0) === 'F') || (front === false && this.positon(lastTrick).charAt(0) === 'B')) {
            // Set trick code to last trick
            trickCode = lastTrick;
            console.log("This is last trick: " + trickCode)

          }
          // If that does not work try doing the reverse of the 2nd to last trick trick
          else {
          if(this.state.tricks_done.length - 2 < 0) {alert("This needs to be fixed")}
          lastTrick = this.state.tricks_done[this.state.tricks_done.length - 2];
          if((front === true && this.positon(lastTrick).charAt(0) === 'F') || (front === false && this.positon(lastTrick).charAt(0) === 'B')) {
            // Set trick code to last trick
            trickCode = lastTrick;
            console.log("This is last trick: " + trickCode)

          }
        }
      }
        //trickCode = trickCode.substring(1);
    }

    console.log(trickCode);
    var result = this.findTrick(trickCode);
    trick = result[0];
    wake = result[1];

    // If we did not find the trick
    if (trick === null) {
      this.setState({message: "Trick not found"});
      return;
    }

    // Check if we can legally do this trick ex: Trying to do a B while already back is imposible
    var postion = this.positon(trickCode);
    var startPosition = postion.charAt(0) === "F"; // Front === True
    var endPosition =  postion.charAt(1) === "F"; // Front === True

    if(front !== startPosition) {
      this.setState({message: "Can't do that, facing wrong direction!"});
      return;
    } 
    else
      front = endPosition;



    //Check if the trick has been done and check the amount to add to the score
    const tricks_done = this.state.tricks_done;
    var toAdd = 0; // Amount to add to score

    if (reverse) {
      trickCode = 'R' + trickCode;
    }

    if (tricks_done.includes(trickCode)) {
      message = "Trick already done! No points.";
    } else {
      if (wake)
        toAdd = trick.scoreWake1Ski;
      else
        toAdd = trick.score1Ski;
    }


    // Set scores and states
    var visual_list = this.state.visual_trick_list;
    var name = (reverse) ? 'Reverse ' + trick.name : trick.name; 
    visual_list.push([name, trickCode, toAdd]);
    tricks_done.push(trickCode);
    this.score(toAdd);
    this.setState({ tricks_done: tricks_done, front: front, message: message, });
  }

  //Add to score
  score(amount) {
    this.setState({ score: parseInt(this.state.score, 10) + parseInt(amount, 10) });
  }

  setUp() {
    //Create trick buttons and components
    var arr = trickListText.split("\n");
    var spins = [];
    var stepovers = [];
    var toes = [];
    var flips = [];
    var skilines = [];
    var elements = [spins, stepovers, toes, flips, skilines];

    // push the component to elements
    var typeOfTrick = 0;
    for (var i = 0; i < arr.length; i++) {
      var trick = arr[i]; // String of trick with name and score

      if (trick !== "@") {
        //name of element
        var name = trick.substring(0, trick.indexOf("-") - 1);
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
    const message = this.state.message;
    console.log(message);
    // <img src={require('./trickski.jpg')} height="150px" width="150px" alt="dwq"/> to add photo
    // Wake button:           <button onClick={() => this.switchWake()}>{this.state.wake ? "Surface" : "Wake"}</button>

    return (
      <div className="application">
        <div className="text-center">
        <h1 className="text-center">Trick Calculator</h1>
        <div className="text-center">{score}</div>
        <div className="text-center">
          <button onClick={() => this.reset()}>Reset</button>
          <div>You are on {this.state.oneSki ? "one ski" : "two skis"}</div>
          <button onClick={() => this.switchSki()}>Switch Ski</button>
        </div>
        <br/>
        <p>{message}</p>
        <InputField
          onSubmit={(trickCode) => this.handleSubmit(trickCode)}
        />

          <div>Current Position: <strong>{this.state.front ? "Front" : "Back"}</strong></div>
          
          <div class="row d-flex justify-content-center table-responsive">
          <table id="trick-table" class="table w-75">
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Points</th>
            </tr>
          {this.state.visual_trick_list.map(txt => <tr><td>{txt[0]}</td><td>{txt[1]}</td><td>{txt[2]}</td></tr>)}
          </table>
          </div>
          </div>

      
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

                  <img src={image} class="img-fluid" alt="Forward facing trick skier" height="20%" width="20%"/>


*/


// ========================================

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
