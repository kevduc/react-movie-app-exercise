import React, { Component } from "react";

import Like from "./common/Like";
import StarRating from "./common/StarRating";
import DeleteButton from "./common/DeleteButton";
import SortingColumnHeader from "./common/SortingColumnHeader";

class MoviesTable extends Component {

  sortBy = (property) => {
    const sortColumn = { ...this.props.sortColumn };
    if (property === sortColumn.property) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.property = property;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, headers, onLike, onDelete, sortColumn } = this.props;
    return (
      <div className="table-responsive text-nowrap">
        <table className="table table-hover align-middle text-center mw-max-content">
          <thead>
            <tr>
              {headers.map(({ name, property }) => (
                <SortingColumnHeader
                  key={name}
                  sortOrder={property === sortColumn.property ? sortColumn.order : null}
                  onClick={() => this.sortBy(property)}
                  scope="col">
                  {name}
                </SortingColumnHeader>
              ))}
              <th key="Delete" scope="col"></th>
            </tr>
          </thead>
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

MoviesTable.defaultProps = {
  sortColumn: { property: null, order: null },
};

export default MoviesTable;
