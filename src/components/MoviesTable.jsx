import React, { Component } from "react";

import Like from "./common/Like";
import StarRating from "./common/StarRating";
import DeleteButton from "./common/DeleteButton";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";

class MoviesTable extends Component {
  columns = [
    { propertyPath: "title", label: "Title" },
    { propertyPath: "genre.name", label: "Genre" },
    { propertyPath: "numberInStock", label: "Stock" },
    {
      propertyPath: "dailyRentalRate",
      label: "Rating",
      render: (movie) => (
        <StarRating
          className="star darkgold"
          //hideEmptyStars={true}
          rating={movie.dailyRentalRate}
          maxRating={5}
        />
      ),
    },
    {
      propertyPath: "liked",
      label: "Liked",
      render: (movie) => (
        <Like
          className=""
          liked={movie.liked}
          //color="black"
          //colorLiked="red"
          onClick={() => {
            this.props.onLike(movie._id);
          }}
        />
      ),
    },
    {
      key: "delete",
      render: (movie) => (
        <DeleteButton
          className="deleteButton btn-sm"
          onClick={() => {
            this.props.onDelete(movie._id);
          }}
        />
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <div className="table-responsive text-nowrap">
        <table className="table table-hover align-middle text-center mw-max-content">
          <TableHeader columns={this.columns} onSort={onSort} sortColumn={sortColumn} />
          <TableBody data={movies} columns={this.columns} />
        </table>
      </div>
    );
  }
}

MoviesTable.defaultProps = {};

export default MoviesTable;
