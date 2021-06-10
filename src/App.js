import './App.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Search from "./Search";
import MoviePreview from "./MoviePreview"
import MovieDetails from "./MovieDetails"

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
        // TODO: error handling
        console.log(data);
        this.setState({
          s_info: data,
          movieSelected: false
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
        // TODO: some sort of error handling here for invalid responses
        // however, there should not be a scenario where this makes it difficiult
        console.log(data.Response);
        if (data.Response === "True") {
          this.setState({
            movieSelected: true
          })
        }
        this.setState({
          titleInfo: data,
        });
      }
    });
  }


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

  backToSearch() {
    this.setState({
      movieSelected: false
    })
  }

  submitted = (bar) => {
    if (bar) {
      this.movieReq(bar);
    }

  }

  render() {
    return (
      <React.Fragment >
        <div>
          {/* {window.addEventListener('keydown', function (e) { if (e.keyIdentifier === 'U+000A' || e.keyIdentifier === 'Enter' || e.keyCode === 13) { if (e.target.nodeName === 'INPUT' && e.target.type === 'text') { e.preventDefault(); return false; } } }, true)} */}
          {!this.state.s_info && (
            <React.Fragment>
              <h1>Welcome to Movie Search!!</h1>
              <h2>Search for your desired movie and click the poster for more information. If you have trouble finding information, please try to be specific regarding the title to narrow the result.</h2>
            </React.Fragment>
          )}
          <div>
            {/* Simple button that sends the state of the searchbar to create the 
          correct request */}
            {/* HERE STATE */}
            {/* <div>
              <button type="submit" onClick={() => { this.movieReq(this.state.search_bar) }}>Search</button>
            </div> */}
            <div className="searchBar">
              {/* Add the Search component to this App Bind use set search to bind 
          the values and allow information exchange */}
              {/* TODO: deal with searching while viewing a specific movie */}
              <Search functionCallFromParent={this.setSearch.bind(this)} submitted={this.submitted.bind(this)} />
            </div>
          </div>
          {!this.state.movieSelected && (
            <div>
              <MoviePreview parentState={this.state.s_info} functionCallFromParent={this.idCall.bind(this)} />
            </div>)}
          {this.state.movieSelected && (
            <div>
              <MovieDetails info={this.state.titleInfo} />
              <button onClick={() => { this.backToSearch() }}>Back To Results</button>
            </div>)}
        </div>
      </React.Fragment >
    )
  }
}

export default App;
