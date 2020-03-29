import React from 'react';

class InputField extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      this.props.onSubmit(this.state.value.toUpperCase().trim());


      event.preventDefault();
      this.setState({value: "",})
      //var scrollableTable = document.getElementById("trick-table");
      //scrollableTable.scrollTop = scrollableTable.scrollHeight;
      //console.log(scrollableTable);
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} placeholder=" Trick Code" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default InputField;