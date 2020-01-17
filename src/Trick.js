import React from 'react';

class Trick extends React.Component {

    render() {
        return (
          <button onClick={() => 
            {
              // If this is only a wake trick then return the wake options
              if(this.props.trickCode === "%") {
                if(this.props.oneSki === true) {
                  this.props.onClick(this.props.scoreWake1Ski);
                } else {
                  this.props.onClick(this.props.scoreWake2Ski);
                  }
                
              } else {
                if(this.props.oneSki === true) {
                  this.props.onClick(this.props.score1Ski);
                } else {
                  this.props.onClick(this.props.score2Ski);
                  }
              }
            }  
          }>

            {this.props.name}
          </button>
        );
      }
}

export default Trick;