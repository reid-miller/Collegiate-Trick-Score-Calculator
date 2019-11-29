import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Trick from './Trick'

function addTricks() {
  console.log("Hello Reid hey hey hey");
}

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tricks: Array(200).fill(null),
            size: 0,
        }
    }

    render() {
      return(
        <h1 id="title">Trick Score Calculator</h1>
      );
    }
}
  
  // ========================================
  
  ReactDOM.render(
    <Application />,
    document.getElementById('root')
  );
  