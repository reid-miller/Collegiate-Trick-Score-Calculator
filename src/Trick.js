import React from 'react';

class Trick extends React.Component {
    
  render() {
      var name = this.props.name;
      var score;
      var front = this.props.front; //Will be sent back up as vakue it should be after button is pressed

      if(name.includes("FF") && !front) {
        if(!front) {
          name = "NO"
        }
      } else if(name.includes("FB")){
        if(front) {
          front = false;
        } else {
          name = "NO"
        }
      } else if(name.includes("BF")) {
        if(front) {
          name = "NO"
          console.log(name + "Rats");
        } else {
          front = true;
        }
      } else if(name.includes("BB")) {
        if(front) {
          name = "NO"
        }
      }


      //If the trick does not need wake added to it ever then we do nothing
      if(this.props.trickCode === "%" || this.props.trickCode === "S" || this.props.trickCode === "TS") {
        // We do nothing
      } 
      // Else it might need "wake" added to the name
      else {
        name = this.props.wake ? "Wake " + name : name; 
      }

      if(this.props.wake) {
        score = this.props.oneSki ? this.props.scoreWake1Ski : this.props.scoreWake2Ski;
      } else {
        score = this.props.oneSki ? this.props.score1Ski : this.props.score2Ski;
      }
        return (
          <button onClick={() => {this.props.onClick(score, front)}}> {name} </button>
        );
      }
}

export default Trick;