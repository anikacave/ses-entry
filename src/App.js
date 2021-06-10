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
          {!this.state.s_info && (
            <React.Fragment>
              <h1>Welcome to Movie Search!!</h1>
              <h2>Search for your desired movie and click the poster for more information. If you have trouble finding information, please try to be specific regarding the title to narrow the result.</h2>
            </React.Fragment>
          )}
          <div>
            <div className="searchBar">
              <Search submitted={this.submitted.bind(this)} />
            </div>
          </div>
          {!this.state.movieSelected && (
            <div>
              <MoviePreview parentState={this.state.s_info} functionCallFromParent={this.idCall.bind(this)} />
            </div>)}
          {this.state.movieSelected && (
            <div>
              <MovieDetails info={this.state.titleInfo} />
              <div className="resultss">
                <button className="backToResults" onClick={() => { this.backToSearch() }}><u>Back To Results</u></button>
              </div>
            </div>)}
        </div>
      </React.Fragment >
    )
  }
}

export default App;
