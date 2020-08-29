import React, { Component } from "react";

import Like from "./Like";

import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = { movies: getMovies() };

  handleLike = (movieId) => {
    const movies = [...this.state.movies];
    const movieIndex = this.state.movies.findIndex((movie) => movie._id === movieId);
    movies[movieIndex] = { ...movies[movieIndex] };
    movies[movieIndex].liked = !movies[movieIndex].liked;
    this.setState({ ...this.state, movies });
  };

  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((movie) => movie._id !== movieId);
    this.setState({ ...this.state, movies });
  };

  render() {
    const numberOfMovies = this.state.movies.length;
    return (
      <div>
        <p className="h3">
          {numberOfMovies > 0 ? `Showing ${numberOfMovies} movies in the database.` : `There are no movies in the database.`}
        </p>
        {numberOfMovies > 0 ? (
          <table className="table table-hover mt-5 align-middle text-center">
            <thead>
              <tr>
                <th scope="col" className="text-left">
                  Title
                </th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map((movie) => (
                <tr key={movie._id}>
                  <td className="text-left">{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      className="btn-lg"
                      liked={movie.liked}
                      //color="black"
                      //colorLiked="red"
                      onClick={() => {
                        this.handleLike(movie._id);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleDelete(movie._id);
                      }}
                      type="button"
                      className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Movies;
