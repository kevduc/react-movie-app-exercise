import React from "react";

import Like from "./common/Like";
import StarRating from "./common/StarRating";
import DeleteButton from "./common/DeleteButton";
import SortingTableHeader from "./common/SortingTableHeader";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete, onSort, sortBy, sortOrder } = props;

  return (
    <div className="table-responsive text-nowrap">
      <table className="table table-hover align-middle text-center mw-max-content">
        <thead>
          <tr>
            {[
              { name: "Title", value: "title" },
              { name: "Genre", value: "genre.name" },
              { name: "Stock", value: "numberInStock" },
              { name: "Rating", value: "dailyRentalRate" },
              { name: "Liked", value: "liked" },
            ].map(({ name, value }) => (
              <SortingTableHeader
                key={name}
                sortOrder={sortBy === value ? sortOrder : null}
                onSort={() => onSort(value)}
                scope="col"
                className={value === "Title" ? "text-left" : ""}>
                {name}
              </SortingTableHeader>
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
};

MoviesTable.defaultProps = {
  sortBy: null,
  sortOrder: null,
};

export default MoviesTable;
