import React from "react";
import "./MovieDetails.css"

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null
    };
  }

  // TODO: Manage. Use is deprecated
  componentWillReceiveProps(nextProps) {
    this.setState({ info: nextProps.info })
  }

  // Check if the value exists
  isValidRender = (comp) => {
    if (comp === "N/A") {
      return (" ")
    }
    else {
      return (comp)
    }
  }

  render() {
    return (
      // TODO: Remove entire component if N/A and remove null values (map)
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
                <p>{this.isValidRender(this.state.info.Plot)}</p>
                <p>{this.isValidRender(this.state.info.Awards)}</p>
                <p>Directed By: {this.isValidRender(this.state.info.Director)}</p>
                <p>Written By: {this.isValidRender(this.state.info.Writer)}</p>
                <p>Rated: {this.isValidRender(this.state.info.Rated)}</p>
                <p>Released: {this.isValidRender(this.state.info.Released)}</p>
                <p>Genre: {this.isValidRender(this.state.info.Genre)}</p>
                <p>Box Office: {this.isValidRender(this.state.info.BoxOffice)}</p>
                <p>RATINGS:</p>
                {console.log(this.state.info.Ratings)}
                {this.state.info.Ratings.map(site =>
                  <p key={site.Source}>{site.Source} : {site.Value}</p>)}
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default MovieDetails