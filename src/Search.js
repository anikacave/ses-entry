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

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
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
      <form className="searchBar" onSubmit={this.handleSubmit}>
        {/* SEARCH */}
        <input className="bar" type="text" placeholder="Search Movie Titles..." value={this.state.value} onChange={this.handleChange} />
        <button className="search" onClick={this.handleSubmit}>Search</button>

      </form>
    );
  }

}

export default Search;