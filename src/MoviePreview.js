import React from "react";

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
          <table>
            <tbody>
              {this.state.data.Search.map(id =>
                <tr className="box" key={id.imdbID} >
                  <td className="track_name"  >
                    <button id={id.imdbID} onClick={() => this.setSelected(id.imdbID)}>
                      <div>
                        <h1>
                          {id.Title} -- {id.Year}
                        </h1>
                      </div>
                      {id.imdbID}
                      <div>
                        <img
                          src={id.Poster}
                          alt={id.imbdID}
                        />
                      </div>
                    </button>
                    {/* {show_image(id.Poster, 100, 300, "img")} */}

                    {/* {id.Poster} */}

                  </td>
                </tr>)
              }
            </tbody>
          </table>
        )
        }
      </React.Fragment>
    );
  }
}



export default MoviePreview;