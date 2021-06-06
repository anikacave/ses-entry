import './App.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Search from "./Search";
import MoviePreview from "./MoviePreview"

class App extends Component {
  constructor() {
    super();
    this.state = {
      // TODO: this is hardcoded u idiot
      token: "3b3549ce",
      s_info: null,
      search_bar: "",
      something: "",
      titleInfo: null,
      movieSelected: false
      // search_bar: "",
    }

  }
  // TODO: factor this out into the search class.. where it belongs
  movieReq(title) {
    console.log(title);
    $.ajax({
      // TODO: hardcoded once again, factor out later
      url: "http://www.omdbapi.com/?s=" + title + "&apikey=3b3549ce",
      type: "GET",
      success: data => {
        console.log(data);
        this.setState({
          s_info: data
        });
      }
    });
  }

  getIdInfo(id) {
    // console.log(title);
    $.ajax({
      // TODO: hardcoded once again, factor out later
      url: "http://www.omdbapi.com/?i=" + id + "&apikey=3b3549ce",
      type: "GET",
      success: data => {
        console.log(data);
        this.setState({
          titleInfo: data
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

  // if this is called render page information
  idCall = (imdbID) => {
    console.log(imdbID);
    this.setState({
      something: imdbID
    });
    this.getIdInfo(imdbID);
    console.log(this.state.titleInfo);
    // this.setState

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
        <div>
          <MoviePreview parentState={this.state.s_info} functionCallFromParent={this.idCall.bind(this)} />

        </div>
      </React.Fragment>
    )
  }
}

export default App;
