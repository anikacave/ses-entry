import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import * as $ from "jquery";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // TODO: this is hardcoded u idiot
      token: "3b3549ce",
      s_info: {}
      // search_bar: "",
    }

  }

  movieReq(title) {
    console.log("cinderella");
    $.ajax({
      url: "http://www.omdbapi.com/?t=cinderella&apikey=3b3549ce",
      type: "GET",
      success: data => {
        console.log(data);
        this.setState({
          s_info: data
        });
      }
    });

  }

  render() {
    return (
      <button type="submit" onClick={() => { this.movieReq("") }}>Send to Playlist app.js</button>

    )

  }

}

export default App;
