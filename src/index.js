import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
    var arr=["one", "two", "three", "four"];
        var elements=[];
        for(var i=0;i<arr.length;i++){
             // push the component to elements!
            elements.push(<TrickButton name={ arr[i] } />);
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
