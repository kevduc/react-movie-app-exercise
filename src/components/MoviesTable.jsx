import React, { Component } from "react";
import _ from "lodash";

import Like from "./common/Like";
import StarRating from "./common/StarRating";
import DeleteButton from "./common/DeleteButton";
import TableHeader from "./common/TableHeader";

class MoviesTable extends Component {
  render() {
    const { movies, columns, onLike, onDelete, onSort, sortColumn } = this.props;
    return (
      <div className="table-responsive text-nowrap">
        <table className="table table-hover align-middle text-center mw-max-content">
          <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td className="text-left">{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>
                  {
                    <StarRating
                      className="star darkgold"
                      //hideEmptyStars={true}
                      rating={movie.dailyRentalRate}
                      maxRating={5}
                    />
                  }
                </td>
                <td>
                  <Like
                    className=""
                    liked={movie.liked}
                    //color="black"
                    //colorLiked="red"
                    onClick={() => {
                      onLike(movie._id);
                    }}
                  />
                </td>
                <td>
                  <DeleteButton
                    className="deleteButton btn-sm"
                    onClick={() => {
                      onDelete(movie._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

MoviesTable.defaultProps = {};

export default MoviesTable;
