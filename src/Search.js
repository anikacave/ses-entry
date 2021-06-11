import React from "react";
import "./Search.css"

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.props.submitted(this.state.value);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // As keys are typed into search bar, change the state of the bar
  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  // When the form is submmitted send the value to parent class
  handleSubmit(event) {
    event.preventDefault();
    this.props.submitted(this.state.value);
  }

  render() {
    return (
      <form className="searchBar" onSubmit={this.handleSubmit}>
        {/* SEARCH */}
        <input className="bar" type="text" placeholder="Search Movie Titles..." value={this.state.value} onChange={this.handleChange} />
        <button className="search" onClick={this.handleSubmit}>Search</button>
      </form>
    );
  }
}

export default Search;