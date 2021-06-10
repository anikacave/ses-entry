import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.props.functionCallFromParent(this.state.value);
    this.handleChange = this.handleChange.bind(this);
    this.props.submitted(this.state.value);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    event.preventDefault();
    this.setState({ value: event.target.value });
    this.props.functionCallFromParent(event.target.value);
  }

  // TODO: fix this bc it erases when it shouldnt or.. factor out the "enter"
  //  key to have mainstream functionality in sending expected request
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.value);
    this.props.submitted(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* SEARCH */}
        <input className="bar" type="text" placeholder="Search Movie Titles..." value={this.state.value} onChange={this.handleChange} />

      </form>
    );
  }

}

export default Search;