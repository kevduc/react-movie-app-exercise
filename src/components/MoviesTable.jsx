import React from "react";

import Like from "./common/Like";
import StarRating from "./common/StarRating";
import DeleteButton from "./common/DeleteButton";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete, onSort } = props;
  return (
    <table className="table table-hover mt-5 align-middle text-center">
      <thead>
        <tr>
          <th scope="col" className="text-left">
            Title
          </th>
          <th scope="col">
            Genre
          </th>
          <th scope="col">
            Stock
          </th>
          <th scope="col">
            Rating
          </th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td className="text-left text-nowrap">{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>
              {
                <StarRating
                  className="star darkgold"
                  //hideEmpty={true}
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
  );
};

export default MoviesTable;
