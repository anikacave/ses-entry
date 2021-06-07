import React from "react";

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
            <h1>{this.state.info.Title} -- {this.state.info.Year}</h1>
            <p>{this.state.info.Plot}</p>
            <p>{this.state.info.Awards}</p>
            <p>Directed By: {this.state.info.Director}</p>
            <p>Written By: {this.state.info.Writer}</p>
            <p>Rated: {this.state.info.Rated}</p>
            <p>Genre: {this.state.info.Genre}</p>
            <p>Box Office: {this.state.info.BoxOffice}</p>
            {this.state.info.Ratings.map(site =>
              <p>{site.Source} : {site.Value}</p>)}
            {/* <button>Back To Results</button> */}
          </React.Fragment>
        )}
      </React.Fragment>


    )
  }


}

export default MovieDetails