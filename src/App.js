import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Search from "./Search";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // TODO: this is hardcoded u idiot
      token: "3b3549ce",
      s_info: {},
      search_bar: ""
      // search_bar: "",
    }

  }
  // TODO: factor this out into the search class.. where it belongs
  movieReq(title) {
    console.log(title);
    $.ajax({
      // TODO: hardcoded once again, factor out later
      url: "http://www.omdbapi.com/?t=" + title + "&apikey=3b3549ce",
      type: "GET",
      success: data => {
        console.log(data);
        this.setState({
          s_info: data
        });
      }
    });

  }

  // This allows the main class (App) to share and exchange information
  // With the Search class... specifically it is setting the search bar to a 
  // passed value
  setSearch = (search) => {
    console.log(search);
    this.setState({
      search_bar: search
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          {/* Simple button that sends the state of the searchbar to create the 
          correct request */}
          <button type="submit" onClick={() => { this.movieReq(this.state.search_bar) }}>Search</button>
        </div>
        <div className="searchBar">
          {/* Add the Search component to this App Bind use set search to bind 
          the values and allow information exchange */}
          <Search functionCallFromParent={this.setSearch.bind(this)} />
        </div>
        <div>
          <p>info here lol</p>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
