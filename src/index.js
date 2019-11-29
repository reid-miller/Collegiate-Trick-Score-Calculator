import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Trick from './Trick'

const title = <h1 id="title">Trick Score Calculator</h1>

function addTricks() {

}



class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tricks: Array(200).fill(null),
            size: 0,
        }
    }
}
  
  // ========================================
  
  ReactDOM.render(
    title,
    document.getElementById('root')
  );
  