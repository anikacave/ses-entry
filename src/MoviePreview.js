import React from "react";
import "./MoviePreview.css";


class MoviePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.parentState,
      selectedtitle: null,
      page: null
    };
    this.props.functionCallFromParent(this.state.selectedtitle);

  }

  // TODO: no longer supported fix later
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.parentState });
  }

  setSelected(id) {
    this.setState({
      selectedtitle: id
    })
    this.props.functionCallFromParent(id);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.data && (
          <div className="holder">
            {this.state.data.map(id =>
              <button className="square" id={id.imdbID} key={id.imdbID} onClick={() => this.setSelected(id.imdbID)}>
                <div className="info">
                  <h1 className="mvd">{id.Title} <br></br> {id.Year}</h1>
                </div>
                {id.imdbID}
                <div>
                  <img className="img"
                    src={id.Poster}
                    alt={id.imbdID}
                  />
                </div>
              </button>
            )};
          </div>
        )}
      </React.Fragment>
    );
  }
}



export default MoviePreview;