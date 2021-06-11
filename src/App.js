import './App.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Search from "./Search";
import MoviePreview from "./MoviePreview"
import MovieDetails from "./MovieDetails"
import { BottomScrollListener } from 'react-bottom-scroll-listener';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // TODO: this is hardcoded u idiot
      token: "3b3549ce",
      s_info: null,
      something: "",
      titleInfo: null,
      movieSelected: false,
      bar: "",
      page: 1
    }

  }
  // TODO: factor this out into the search class.. where it belongs
  movieReq(title, page) {
    $.ajax({
      // TODO: hardcoded once again, factor out later
      url: "http://www.omdbapi.com/?s=" + title + "&apikey=3b3549ce&page=" + page,
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
          console.log(data);

        }
        else {
          alert("Invalid Search: Try being more specific or checking your spelling")
        }

      }
    });
  }


  getIdInfo(id) {
    $.ajax({
      // TODO: hardcoded once again, factor out later
      url: "http://www.omdbapi.com/?i=" + id + "&apikey=3b3549ce",
      type: "GET",
      success: data => {
        // TODO: some sort of error handling here for invalid responses
        // however, there should not be a scenario where this makes it difficiult
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
    this.setState({
      something: imdbID
    });
    this.getIdInfo(imdbID);
    // this.setState
  }

  backToSearch() {
    this.setState({
      movieSelected: false
    })
  }

  // set state for access
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

  getPage = () => {
    console.log();

    this.setState({
      page: this.state.page + 1
    })

    console.log(this.state.page);

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
