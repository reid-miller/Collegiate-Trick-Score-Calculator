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
      message: "You are riding on one ski. Enter tricks below or learn how to use this through the link in the footer",
      visual_trick_list: [],
      start: true,
    }
  }

  switchWake() {
    this.setState({ wake: !this.state.wake })
  }

  //Reset score
  reset() {
    // Set what ski they are riding on (visualy)
    var ski = this.state.oneSki ? "one ski" : "two skis";
    this.setState({ score: 0, front: true, tricks_done: [], visual_trick_list: [], message: "Trick run reset: You are riding on " + ski + "\n"}); // Reset Score   
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

  // Finds trick info based off trick code
  findTrick(trickCode) {

    if(trickCode.charAt(0) === 'R') {
      return null;
    }

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

    if (trick === null) {
      return null;
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
    var message = null;
    var reverseTrick = null;
    var reverseTrickCode = null;

    this.setState({start: false});

    // Check if reverse
    if (trickCode.charAt(0) === 'R') {
      reverse = true;

      // See if the user typed R or R...
      
        if (trickCode.length > 1) {
        

        reverseTrickCode = trickCode.substring(1);
        reverseTrick = this.findTrick(reverseTrickCode);

        if(reverseTrick === null) {
          this.setState({message: "Trick not found"});
          return;
        }

        reverseTrick = reverseTrick[0];

        trickCode = 'R';
      }

      
        if(trickCode === 'R') {
          var position = "Nothing";
          // If it's just R than try pulling the other tricks

          // Try doing the last trick
          
          // If we try reverse as first trick
          if(this.state.tricks_done.length - 1 < 0) {
            this.setState({message: "No trick to do the reverse of"});
            return;
          }
          var lastTrickCode = this.state.tricks_done[this.state.tricks_done.length - 1];
          
          var lastTrick = this.findTrick(lastTrickCode);
          if(lastTrick !== null) {
            position = lastTrick[0].start; // Get what position you need to start in
          }
        
          if((front === true && position === 'F') || (front === false && position === 'B')) {
            // Set trick code to last trick
            trickCode = lastTrickCode;
          }
          // If that does not work try doing the reverse of the 2nd to last trick trick
          else {
            if(this.state.tricks_done.length - 2 < 0) {alert("No trick to do the reverse of")}

          lastTrickCode = this.state.tricks_done[this.state.tricks_done.length - 2];
          lastTrick = this.findTrick(lastTrickCode);
          if(lastTrick !== null) {
            position = lastTrick[0].start; // Get what position you need to start in
          }
          if((front === true && position === 'F') || (front === false && position === 'B')) {
            // Set trick code to last trick
            trickCode = lastTrickCode;
          }
        }
      }
    }

    var result = this.findTrick(trickCode);

    //If R... was typed and there was no result

    // If we did not find the trick
    if (result === null) {
      this.setState({message: "Trick not found"});
      return;
    }

    if (reverseTrick !== null && result[0] !== reverseTrick) {
      this.setState({message: "Can not do reverse of that trick with current setup"});
      return;
    }

    trick = result[0];
    wake = result[1];

    if (reverse && !trick.score1Ski.includes('*') && !trick.score1Ski.includes('%')) {
      this.setState({message: trick.name + " is not reversableT"});
      return;
    } else if (reverse && !trick.scoreWake1Ski.includes('*') && !trick.scoreWake1Ski.includes('%')) {
      this.setState({message: trick.name + " is not reversableh"});
      return;
    } 

    // Check if we can legally do this trick ex: Trying to do a B while already back is imposible
    var startPosition = trick.start === "F"; // Front === True
    var endPosition =  trick.end === "F"; // Front === True

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
          start: trick[6],
          end: trick[7],
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


  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }
  

  render() {
    const score = this.state.score;
    const message = this.state.message;
    var thing = message == null ? false : message.includes("Trick run reset");
    const start = this.state.start;
    

    // <img src={require('./trickski.jpg')} height="150px" width="150px" alt="dwq"/> to add photo
    // Wake button:           <button onClick={() => this.switchWake()}>{this.state.wake ? "Surface" : "Wake"}</button>

    return (
      <body>
      <div className="application">
        <div className="text-center">
        <h1 className="text-center display-4">Trick Calculator</h1>
        <div className="text-center display-4">{score}</div>
        <div className="text-center">
        </div>
        <br/>
        <div class="justify-content-center"><p class="sizing-message ">{message}</p>{thing || start ? <button onClick={() => this.switchSki()}>Switch Ski</button>: null}</div>
        <div>{thing || start ? <br /> : null}</div>
        <InputField
          onSubmit={(trickCode) => this.handleSubmit(trickCode)}
        />

          <div>Current Position: <strong>{this.state.front ? "Front" : "Back"}</strong></div>
          <br />
          
          <div class="row d-flex justify-content-center table-responsive">
          <table id="trick-table" class="table w-75">
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Points</th>
            </tr>
          {this.state.visual_trick_list.map(txt => <tr><td>{txt[0]}</td><td>{txt[1]}</td><td>{txt[2]}</td></tr>)}
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
          </div>
          </table>
          </div>

          <div>
              {thing || start ? null : <button onClick={() => this.reset()}>Reset</button>}
          </div>
          <br />

          </div>
          </div>

          <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
            <div class="container text-center">
              <small><p><a rel="noopener noreferrer" target="_blank" href="https://github.com/reid-miller/Collegiate-Trick-Score-Calculator/blob/master/src/Trick-Scores.pdf">Trick List</a> | <a rel="noopener noreferrer" target="_blank" href="https://github.com/reid-miller/Collegiate-Trick-Score-Calculator/blob/master/README.md">How to Use</a> | <a rel="noopener noreferrer" target="_blank" href="http://www.usawaterski.org/">USA Water Ski</a></p></small>
              <small>Made by <a rel="noopener noreferrer" target="_blank" href="http://reidhub.com">Reid Miler</a></small>
            </div>
          </footer>
      </body>
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
