import './App.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Search from "./Search";
import MoviePreview from "./MoviePreview"
import MovieDetails from "./MovieDetails"
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import { apikey } from "./config.js"

class App extends Component {
  constructor() {
    super();
    this.state = {
      s_info: null,
      something: "",
      titleInfo: null,
      movieSelected: false,
      bar: "",
      page: 1
    }
  }

  // Makes a request to the OMDB api with 
  // {title}: the name of the movie being searched for
  // {page}: the page of information that should be queried
  // TODO: factor this out into the search class.. where it belongs
  movieReq(title, page) {
    $.ajax({
      url: "http://www.omdbapi.com/?s=" + title + "&" + apikey + "=3b3549ce&page=" + page,
      type: "GET",
      success: data => {
        // TODO: error handling
        if (data.Response === "True") {
          if (page === 1) {
            this.setState({
              s_info: data.Search,
              movieSelected: false
            });
          }
          else {
            this.setState({
              s_info: this.state.s_info.concat(data.Search),
              movieSelected: false
            });
          }
        }
        else {
          alert("Invalid Search: Try being more specific or checking your spelling")
        }
      }
    });
  }

  // Request to the api for information on a movie with {id}
  // REQUIRES: The id of the movie selected is a valid ID
  getIdInfo(id) {
    $.ajax({
      url: "http://www.omdbapi.com/?i=" + id + "&" + apikey + "=3b3549ce",
      type: "GET",
      success: data => {
        // error handling here should be covered by requires clause
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

  // Called when a movie is selected from the list.
  // Sets the state of the movie-id to be that of the users selection
  idCall = (imdbID) => {
    this.setState({
      // TODO: rename this variable
      something: imdbID
    });
    this.getIdInfo(imdbID);
  }

  // Update {movieSelected} to false, which should rerender the search results
  // Takes user back to their search results
  backToSearch() {
    this.setState({
      movieSelected: false
    })
  }

  // Called when the search bar is submitted
  // Creates a new movie request on the first page of results
  submitted = (bar) => {
    if (bar) {
      this.movieReq(bar, 1);
      this.setState({
        bar: bar,
        page: 1,
        s_info: null
      })
    }
  }

  // Called when the user reaches the end of their current search query
  // Updates the page of data showed and creates a new request to the API for
  // More data 
  getPage = () => {
    this.setState({
      page: this.state.page + 1
    })
    this.movieReq(this.state.bar, this.state.page)
  }

  render() {
    return (
      <React.Fragment >
        <div>
          {!this.state.s_info && (
            <React.Fragment>
              <div className="intro">
                <h1><u>Movie Search</u></h1>
                <p>Search for your desired movie and click the poster for more information. If you have trouble finding information, please try to be specific regarding the title to narrow the result.</p>
              </div>
            </React.Fragment>
          )}
          <div>
            <div className="searchBar">
              <Search submitted={this.submitted.bind(this)} />
            </div>
          </div>
          {!this.state.movieSelected && (
            <div>
              <MoviePreview parentState={this.state.s_info} functionCallFromParent={this.idCall.bind(this)} getPage={this.getPage.bind(this)} />
              <BottomScrollListener onBottom={() => this.getPage()} />
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
