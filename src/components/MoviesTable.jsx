import React from "react";

import Like from "./common/Like";
import StarRating from "./common/StarRating";
import DeleteButton from "./common/DeleteButton";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete, onSort } = props;
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle text-center mw-max-content">
        <thead>
          <tr>
            <th onClick={() => onSort("title")} scope="col" className="text-left">
              Title
            </th>
            <th onClick={() => onSort("genre.name")} scope="col">
              Genre
            </th>
            <th onClick={() => onSort("numberInStock")} scope="col">
              Stock
            </th>
            <th onClick={() => onSort("dailyRentalRate")} scope="col">
              Rating
            </th>
            <th onClick={() => onSort("liked")} scope="col"></th>
            <th scope="col"></th>
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

export default MoviesTable;
