import React from 'react';

class Trick extends React.Component {
    render() {
      var name = this.props.name;
      var score;

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
          <button onClick={() => {this.props.onClick(score)}}> {name} </button>
        );
      }
}

export default Trick;