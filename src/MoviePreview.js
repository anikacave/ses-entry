import React from "react";
import "./MoviePreview.css"

class MoviePreview extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.parentState);
    this.state = {
      data: this.props.parentState,
      selectedtitle: null,
    };
    this.props.functionCallFromParent(this.state.selectedtitle);

  }

  // TODO: no longer supported fix later
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.parentState });
  }

  setSelected(id) {
    console.log(id);
    this.setState({
      selectedtitle: id
    })
    this.props.functionCallFromParent(id);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.data && (
          // <table>
          //   <tbody>
          <div className="holder">
            {this.state.data.Search.map(id =>
              // <tr className="box" key={id.imdbID} >
              //   <td className="track_name"  >
              <button className="square" id={id.imdbID} key={id.imdbID} onClick={() => this.setSelected(id.imdbID)}>
                <div>
                  <h1>
                    {id.Title} -- {id.Year}
                  </h1>
                </div>
                {id.imdbID}
                <div>
                  <img className="img"
                    src={id.Poster}
                    alt={id.imbdID}
                  />
                </div>
              </button>

              //   </td>
              // </tr>)
            )
            }
          </div>
          //   </tbody>
          // </table>
        )
        }
      </React.Fragment>
    );
  }
}



export default MoviePreview;