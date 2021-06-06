import React from "react";

// class MoviePreview extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { data: null };
//   }

//   setData(data_parent) {
//     console.log("data set");
//     this.setState({
//       data: data_parent
//     });
//   }


const MoviePreview = props => {
  if (props.ids != null) {
    console.log(props.ids.Search);
  }

  return (
    <React.Fragment>
      {props.ids && (
        <table>
          <tbody>
            {props.ids.Search.map(id =>
              <tr className="box" key={id.imdbID} >
                <td className="track_name"  >
                  <button>
                    {id.Title}
                  </button>
                  <button>{id.Year}</button>
                  <button>{id.imdbID}</button>
                  <button>
                    <img
                      src={id.Poster}
                      alt={id.imbdID}
                    />
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



export default MoviePreview;