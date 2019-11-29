import React from 'react';

class Trick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            trickCode: this.props.trickCode,
            score2Ski: this.props.score2Ski,
            score1Ski: this.props.score1Ski,
            wakeTrickCode: this.props.wakeTrickCode,
            scoreWake2Ski: this.props.scoreWake2Ski,
            scoreWake1Ski: this.props.scoreWake1Ski,
        }
    }
}

export default Trick;