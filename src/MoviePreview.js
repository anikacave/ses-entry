import React from "react";
import "./MoviePreview.css";
import { BottomScrollListener } from 'react-bottom-scroll-listener';

class MoviePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.parentState,
      selectedtitle: null,
      page: 1
    };
    this.props.getPage(this.state.page);
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

  setPage() {
    this.setState({
      page: this.state.page + 1
    })
    this.props.getPage();
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

              //   </td>
              // </tr>)
            )
            }
            <BottomScrollListener onBottom={this.setPage()} />;
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