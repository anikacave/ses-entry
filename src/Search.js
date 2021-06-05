import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.props.functionCallFromParent(this.state.value);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    event.preventDefault();
    this.setState({ value: event.target.value });
    this.props.functionCallFromParent(event.target.value);
  }

  handleSubmit(event) {
    alert('Search Value' + this.state.value);
    event.preventDefault();
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