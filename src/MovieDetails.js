import React from "react";
import "./MovieDetails.css"

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ info: nextProps.info })
  }


  render() {
    return (
      // Check for null values before rendering
      console.log(this.state.info),

      <React.Fragment>
        {this.state.info && (
          <React.Fragment>
            <div className="center">
              <h1>{this.state.info.Title} -- {this.state.info.Year}</h1>
            </div>
            <div className="layout">
              <div className="imgdiv">
                <img className="dimg"
                  src={this.state.info.Poster}
                  alt={this.state.info.imbdID}
                />
              </div>
              <div className="mdinfo">
                <p>{this.state.info.Plot}</p>
                <p>{this.state.info.Awards}</p>
                <p>Directed By: {this.state.info.Director}</p>
                <p>Written By: {this.state.info.Writer}</p>
                <p>Rated: {this.state.info.Rated}</p>
                <p>Released: {this.state.info.Released}</p>
                <p>Genre: {this.state.info.Genre}</p>
                <p>Box Office: {this.state.info.BoxOffice}</p>
                <p>RATINGS:</p>
                {this.state.info.Ratings.map(site =>
                  <p>{site.Source} : {site.Value}</p>)}
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>


    )
  }


}

export default MovieDetails